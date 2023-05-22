import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Transaction } from '../types/Transaction';
import { makePrismaQuery } from '../helpers/makePrismaQuery';
import { removeRecordId } from '../helpers/removeRecordId';

const prisma = new PrismaClient();

export async function getAllTransactions(req: Request, res: Response) {
  try {
    const { userId, query } = req.body;
    const keyword = req.body.keyword ? req.body.keyword : 'findMany';
    const transactions = await makePrismaQuery({
      keyword,
      userID: userId ? userId : 0,
      query,
      table: 'transaction'
    });
    res.status(200);
    res.send(JSON.stringify(transactions));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
};
