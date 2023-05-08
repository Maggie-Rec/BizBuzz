import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import test from 'node:test';
import { Transaction } from '../types/Transaction';

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