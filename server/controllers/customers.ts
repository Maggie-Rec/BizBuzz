import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Customer } from '../types/Customer';

const prisma = new PrismaClient();

export async function getAllCustomers(req: Request, res: Response) {
  try {
    const { user, query } = req.body;
    console.log('query:', query);
    const customers = await prisma['customer_0'].findMany(query) as Customer[];
    console.log(customers.length);
    // customers.forEach((customer) => {
    //   if (customer.record_id) customer.record_id = customer.record_id.toString(10);
    // })
    res.status(200);
    res.send(JSON.stringify(customers));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
};