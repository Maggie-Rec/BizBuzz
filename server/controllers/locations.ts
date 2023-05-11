import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Location } from '../types/Location';
import { makePrismaQuery } from '../helpers/makePrismaQuery';

const prisma = new PrismaClient();

export async function getAllLocations(req: Request, res: Response) {
  try {
    const { user, query } = req.body;
    const keyword = req.body.keyword ? req.body.keyword : 'findMany';
    console.log('keyword:', keyword);
    console.log('query:', query);
    const locations = await makePrismaQuery({
      keyword,
      userID: user ? user.id : 0,
      query,
      table: 'location_'
    });
    res.status(200);
    res.send(JSON.stringify(locations));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
};