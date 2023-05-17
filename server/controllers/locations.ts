import { Request, Response } from 'express';
import { Location } from '../types/Location';
import { makePrismaQuery } from '../helpers/makePrismaQuery';

export async function getAllLocations(req: Request, res: Response) {
  try {
    const { userId, query } = req.body;
    const keyword = req.body.keyword ? req.body.keyword : 'findMany';
    console.log('keyword:', keyword);
    console.log('query:', query);
    const locations = await makePrismaQuery({
      keyword,
      userID: userId ? userId : 0,
      query,
      table: 'location'
    });
    res.status(200);
    res.send(JSON.stringify(locations));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
};

export async function addNewLocation(req: Request, res: Response) {
  try {
    const { userId, query } = req.body;
    const createMany = await makePrismaQuery({
      keyword: "create",
      userID: `${userId}`,
      query,
      table: "location"
    });
    res.status(201);
    res.send(JSON.stringify({ message: "Posted a location to the database" }));
  } catch (error) {
    console.error(error);
    res.status(404);
    res.send({ message: "Failed to post a location to the database" });
  }
}