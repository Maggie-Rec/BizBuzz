import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Transaction } from '../types/Transaction';
import { makePrismaQuery } from '../helpers/makePrismaQuery';
import { removeRecordId } from '../helpers/removeRecordId';

const prisma = new PrismaClient();

export async function getAllTransactions(req: Request, res: Response) {
  try {
    const { user, query } = req.body;
    const keyword = req.body.keyword ? req.body.keyword : 'findMany';
    console.log('keyword:', keyword);
    console.log('query:', query);
    const transactions = await makePrismaQuery({
      keyword,
      userID: user ? user.id : 0,
      query,
      table: 'transaction_'
    });
    console.log('transactions:', transactions);
    res.status(200);
    res.send(JSON.stringify(transactions));
    // res.send(JSON.stringify(removeRecordId(transactions)));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
};
