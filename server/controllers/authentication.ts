import { Response, Request, response, Application, NextFunction } from 'express';
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
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function registerUser(req: Request, res: Response) {
  try {
    const newUser = req.body;
    newUser.id = prettify(await bcrypt.genSalt(10));
    const isAlreadyRegistered = await prisma.user.findUnique({
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
      await createUserTables(newUserRecord.id);
      await loginUser(req, res, () => { }, newUser.password);
      // TODO: IMPROVE REGISTRATION & TABLE CREATION PROCESS
    } else {
      res.status(400);
      res.json({ message: 'Registration: invalid credentials' });
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
  await execaCommand('npx prisma generate');
  // await execaCommand('npx prisma migrate deploy');
  // ISSUE: PRISMA DETECTS MACHINE-RUN MIGRATIONS AND STOPS THEM
};

export async function loginUser(req: Request, res: Response, next: NextFunction, newUserPassword: string = "") {
  try {
    const user = req.body;
    if (newUserPassword !== "") user.password = newUserPassword;
    const registeredUser = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    });
    if (registeredUser) {
      const passwordCheck = await bcrypt.compare(user.password, registeredUser.password as string);
      if (passwordCheck) {
        const token = jwt.sign({ id: registeredUser.id }, `${secret}`);
        const userData = registeredUser;
        userData.password = "";
        res.status(200);
        res.cookie("token", token);
        res.cookie("username", userData.username);
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

