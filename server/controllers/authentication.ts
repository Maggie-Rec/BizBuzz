import { Response, Request, response } from 'express';
import { execaCommand } from 'execa';
import { addTransactionsTable } from '../helpers/addTransactionsTable';
import { addItemsTable } from '../helpers/addItemsTable';
import { addLocationsTable } from '../helpers/addLocationsTable';
import { addCustomersTable } from '../helpers/addCustomersTable';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs, { readFileSync } from "node:fs";
import { secret } from '../config';
import prisma from '../db';

export async function registerUser(req: Request, res: Response) {
  try {
    const newUser = req.body;
    console.log(newUser);
    newUser.id = await bcrypt.genSalt(10);
    const isAlreadyRegistered = await prisma.user.findFirst({
      where: {
        email: newUser.email
      }
    });
    if (!isAlreadyRegistered) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newUser.password, salt);
      const newUserRecord = newUser;
      newUserRecord.password = passwordHash;
      const save = await prisma.user.create({
        data: newUserRecord
      });
      res.status(200);
      res.json({ message: 'Registered a new user' });
    } else {
      res.status(400);
      res.json({ message: 'Invalid credentials'});
    }
    // TODO: AUTO LOGIN
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: 'Failed to register a new user' });
  }
  // let userID = Math.floor(Math.random() * 10000);
  // // NB The above is a placeholder until we have properly-implemented tracking of users

  // // any kind of verification? Or checking whether this is new business or new user for existing business?


  // // add info to database of users


  // // create new database tables for user transactions, locations, customers, items
  // addTransactionsTable(userID);
  // addItemsTable(userID);
  // addLocationsTable(userID);
  // addCustomersTable(userID);

  // // Migrate to database
  // // await execaCommand(`npx prisma migrate deploy --name added_transaction_${userID}`);
  // await execaCommand('npx prisma db push');

  // // send required info back to user
  // res.status(201);
  // res.send('Success response');
};

export async function loginUser(req: Request, res: Response) {
  try {
    const user = req.body;
    const registeredUser = await prisma.user.findFirst({
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
        res.json({ token, userData });
        return;
      } else {
        res.status(400);
        res.send({ message: "Invalid credentials" });
        return;
      };
    } else {
      res.status(400);
      res.send({ message: "Invalid credentials" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Authentication error');
  }
};

