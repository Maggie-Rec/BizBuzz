import { Prisma, PrismaClient } from '@prisma/client';
import { Type } from 'typescript';
import { PrismaFindMany } from '../types/PrismaQueryReturns';
import { Query } from '../types/Query';
// import prisma from '../db';

// ISSUE: CREATING A NEW PRISMA CLIENT STALLS THE DB ON MAKING REQUESTS TO IT
// A NEW CLIENT DOES NOT SEE THE OTHER CLIENTS' TABLES
// POSSIBLE REASON: DB PUSH DOES NOT REGENERATE THE CLIENT
const prisma = new PrismaClient() as any;

export default prisma;

export function makePrismaQuery({ keyword, userID, query, table }: { keyword: string, userID: number | string, query: any, table: string }) {
  console.log('Query in makePrismaQuery:', query);
  console.log('keyword', keyword, 'userId', userID, 'table', table);
  try {
    if (keyword === 'findMany') {
      return prisma[`${table}_${userID}`].findMany(query);
    } else if (keyword === 'aggregate') {
      return prisma[`${table}_${userID}`].aggregate(query);
    } else if (keyword === 'groupBy') {
      return prisma[`${table}_${userID}`].groupBy(query);
    } else if (keyword === 'create') {
      return prisma[`${table}_${userID}`].createMany(query);
    } else if (keyword === 'update') {
      return prisma[`${table}_${userID}`].update(query);
    } else if (keyword === 'delete') {
      return prisma[`${table}_${userID}`].deleteMany(query);
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}