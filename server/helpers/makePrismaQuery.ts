import { Prisma, PrismaClient } from '@prisma/client';
import { Type } from 'typescript';
import { PrismaFindMany } from '../types/PrismaQueryReturns';
import { Query } from '../types/Query';


const prisma = new PrismaClient() as any;

export function makePrismaQuery({ keyword, userID, query, table }: { keyword: string, userID: number | string, query: any, table: string }) {
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