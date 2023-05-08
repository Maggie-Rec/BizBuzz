import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function main() {
  // ...
};

interface Transaction {
  record_id: bigint | string,
  transaction_id: number, 
  date: Date,
  time: Date,
  location_id: number,  
  SKU: string,   
  quantity: Decimal,      
  is_member: boolean,    
  customer_id: number,   
  tax: Decimal,  
  total_with_tax: Decimal
}

export async function getAllTransactions(req: Request, res: Response) {
  const { user, query } = req.body;
  // const transactions = await prisma[`transaction_${user}`].findMany(query);
  const transactions = await prisma['transaction_0'].findMany(query);
  const test = transactions[0] as Transaction;
  test.record_id = test.record_id.toString(10);
  console.log(test);
  res.status(200);
  res.send(JSON.stringify(test));
};