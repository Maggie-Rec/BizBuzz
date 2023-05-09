import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Item } from '../types/Item';
const prisma = new PrismaClient();

export async function getAllItems(req: Request, res: Response) {
  try {
    const { user, query } = req.body;
    console.log('query:', query);
    const items = await prisma['item_0'].findMany(query) as unknown as Item[];
    console.log(items.length);
    // items.forEach((item) => {
    //   if (item.record_id) item.record_id = item.record_id.toString(10);
    // })
    res.status(200);
    res.send(JSON.stringify(items));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
};