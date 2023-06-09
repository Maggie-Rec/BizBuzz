import { Request, Response } from 'express';
import { Customer } from '../types/Customer';
import { makePrismaQuery } from '../helpers/makePrismaQuery';
import prisma from '../helpers/makePrismaQuery';

export async function getAllCustomers(req: Request, res: Response) {
  try {
    const { userId, query } = req.body;
    const keyword = req.body.keyword ? req.body.keyword : 'findMany';
    console.log('query:', query);
    const customers = await makePrismaQuery({
      keyword,
      userID: userId ? userId : 0,
      query,
      table: 'customer'
    });
    res.status(200);
    res.send(JSON.stringify(customers));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
};