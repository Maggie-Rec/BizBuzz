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

export async function registerUser(req: Request, res: Response) {
  try {
    const newUser = req.body;
    console.log(newUser);
    newUser.id = bcrypt.genSalt(10);
    // TODO: DUPLICATE CREDENTIALS AND ID CHECK
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newUser.password, salt);
    const newUserRecord = newUser;
    newUserRecord.password = passwordHash;
    // TODO: SAVE TO THE DATABASE
    const save = fs.appendFileSync('./userdata.json', JSON.stringify(newUserRecord), "utf-8");
    res.status(200);
    response.send({ message: 'Registered a new user' });
    // TODO: AUTO LOGIN
  } catch (error) {
    console.error(error);
    res.status(500);
    response.send({ message: 'Failed to register a new user' });
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
    console.log(user);
    const users = JSON.parse(readFileSync("./userdata.json", "utf8"));
    const registeredUser = users.find((item) => {
      if (item.email === user.email) {
        return item;
      }
    });
    if (registeredUser) {
      const passwordCheck = await bcrypt.compare(user.password, registeredUser.password as string);
      if (passwordCheck) {
        console.log('Successful login!');
        const token = jwt.sign({ id: registeredUser.id }, `${secret}`);
        const userData = registeredUser;
        userData.password = "";
        response.status(200);
        response.json({ token, userData });
        return;
      } else {
        response.status(400);
        response.send({ message: "Invalid credentials" });
        return;
      };
    } else {
      response.status(400);
      response.send({ message: "Invalid credentials" });
      return;
    }
  } catch (error) {
    console.log(error);
    response.status(500);
    response.send('Authentication error');
  }
};

