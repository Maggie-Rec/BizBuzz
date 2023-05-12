import { Prisma, PrismaClient } from '@prisma/client';
import { Type } from 'typescript';
import { PrismaFindMany } from '../types/PrismaQueryReturns';
import { Query } from '../types/Query';


const prisma = new PrismaClient() as any;

export function makePrismaQuery({ keyword, userID, query, table }: { keyword: string, userID: number, query: any, table: string }) {
  console.log('Query in makePrismaQuery:', query);
  try {
    if (keyword === 'findMany') {
      return prisma[`${table}${userID.toString()}`].findMany(query);
    } else if (keyword === 'aggregate') {
      return prisma[`${table}${userID.toString()}`].aggregate(query);
    } else if (keyword === 'groupBy') {
      return prisma[`${table}${userID.toString()}`].groupBy(query);
    } else if (keyword === 'create') {
      return prisma[`${table}${userID.toString()}`].createMany(query);
    } else if (keyword === 'update') {
      return prisma[`${table}${userID.toString()}`].update(query);
    } else if (keyword === 'delete') {
      return prisma[`${table}${userID.toString()}`].deleteMany(query);
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}