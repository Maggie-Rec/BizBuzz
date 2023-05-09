import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Item } from '../types/Item';
const prisma = new PrismaClient();
import { makePrismaQuery } from '../helpers/makePrismaQuery';

export async function getAllItems(req: Request, res: Response) {
  try {
    const { user, query } = req.body;
    const keyword = req.body.keyword ? req.body.keyword : 'findMany';
    console.log('query:', query);
    const items = await makePrismaQuery({
      keyword,
      userID: user ? user.id : 0,
      query,
      table: 'item_'
    });
    res.status(200);
    res.send(JSON.stringify(items));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
};