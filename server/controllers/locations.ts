import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Location } from '../types/Location';

const prisma = new PrismaClient();

export async function getAllLocations(req: Request, res: Response) {
  try {
    const { user, query } = req.body;
    console.log('query:', query);
    const locations = await prisma['location_0'].findMany(query) as Location[];
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