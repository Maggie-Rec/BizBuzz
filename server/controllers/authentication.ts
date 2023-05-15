import { Response, Request, response, Application } from 'express';
import { execaCommand } from 'execa';
import { addTransactionsTable } from '../helpers/addTransactionsTable';
import { addItemsTable } from '../helpers/addItemsTable';
import { addLocationsTable } from '../helpers/addLocationsTable';
import { addCustomersTable } from '../helpers/addCustomersTable';
import User from '../types/User';
import prettify from '../helpers/prettify';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from '../config';
import prisma from '../db';

export async function registerUser(req: Request, res: Response) {
  try {
    const newUser = req.body;
    newUser.id = prettify(await bcrypt.genSalt(10));
    const isAlreadyRegistered = await prisma.user.findFirst({
      where: {
        email: newUser.email
      }
    });
    if (!isAlreadyRegistered) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newUser.password, salt);
      const newUserRecord = {} as User;
      Object.assign(newUserRecord, newUser);
      newUserRecord.password = passwordHash;
      const save = await prisma.user.create({
        data: newUserRecord
      });
      // DONE: AUTO LOGIN
      // res.status(200);
      // res.json({ message: 'Registered a new user' });
      await createUserTables(newUserRecord.id);
      await loginUser(req, res, newUser.password);
    } else {
      res.status(400);
      res.json({ message: 'Registration: invalid credentials'});
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: 'Failed to register a new user' });
  }
};

async function createUserTables(userId: string) {
  addTransactionsTable(userId);
  addItemsTable(userId);
  addLocationsTable(userId);
  addCustomersTable(userId);
  await execaCommand('npx prisma db push');
};

export async function loginUser(req: Request, res: Response, newUserPassword: any = "") {
  try {
    const user = req.body;
    console.log(user);
    // THIRD ARGUMENT BECOMES A FUNCTION FOR SOME REASON, HENCE ADDITIONAL CHECK
    if (newUserPassword.length > 0 && typeof newUserPassword !== "function") user.password = newUserPassword;
    console.log('email:', user.email);
    const registeredUser = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    });
    console.log(registeredUser);
    console.log(user);
    if (registeredUser) {
      const passwordCheck = await bcrypt.compare(user.password, registeredUser.password as string);
      console.log(passwordCheck);
      if (passwordCheck) {
        const token = jwt.sign({ id: registeredUser.id }, `${secret}`);
        const userData = registeredUser;
        console.log(token);
        userData.password = "";
        res.status(200);
        res.cookie("token", token);
        res.json({ token, userData });
        return;
      } else {
        res.status(400);
        res.send({ message: "Login: invalid credentials" });
        return;
      };
    } else {
      res.status(400);
      res.send({ message: "Login: invalid credentials" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Authentication error');
  }
};

