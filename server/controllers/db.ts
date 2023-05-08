import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import test from 'node:test';
import { Transaction } from '../types/Transaction';
import { Location } from '../types/Location';
import { Customer } from '../types/Customer';
import { Item } from '../types/Item';

const prisma = new PrismaClient();

async function main() {
  // ...
};

export async function getAllTransactions(req: Request, res: Response) {
  try {
    const { user, query } = req.body;
    console.log('query:', query);
    const transactions = await prisma['transaction_0'].findMany(query) as [Transaction];
    console.log(transactions.length);
    transactions.forEach((transaction) => {
      if (transaction.record_id) transaction.record_id = transaction.record_id.toString(10);
    })
    res.status(200);
    res.send(JSON.stringify(transactions));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
};

// const a = await prisma['transaction_0'].findMany({
//   where: { 
//     location_id: 2,
//   },
//   select: {
//     location_id: true,
//     total_with_tax: true,
//     location: true
//   }
// })

// {
//   "query": {
//       "where": {
//           "location_id": 2
//       },
//       "select": {
//           "location_id": true,
//           "total_with_tax": true,
//           "location": {
//               "select": {
//                   "region": true,
//                   "name": true
//               }
//           }
//       }
//   }
// }

export async function getAllLocations(req: Request, res: Response) {
  try {
    const { user, query } = req.body;
    console.log('query:', query);
    const locations = await prisma['location_0'].findMany(query) as [Location];
    console.log(locations.length);
    // locations.forEach((location) => {
    //   if (location.record_id) location.record_id = location.record_id.toString(10);
    // })
    res.status(200);
    res.send(JSON.stringify(locations));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
};

export async function getAllCustomers(req: Request, res: Response) {
  try {
    const { user, query } = req.body;
    console.log('query:', query);
    const customers = await prisma['customer_0'].findMany(query) as [Customer];
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

export async function getAllItems(req: Request, res: Response) {
  try {
    const { user, query } = req.body;
    console.log('query:', query);
    const items = await prisma['item_0'].findMany(query) as [Item];
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