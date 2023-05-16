import { Request, Response } from 'express';
import { makePrismaQuery } from '../helpers/makePrismaQuery';


export async function getInventory(req: Request, res: Response) {
  try {
    const { userId, query } = req.body;
    console.log('request recieved', userId);
    const keyword = req.body.keyword ? req.body.keyword : 'findMany';
    const inventoryData = await makePrismaQuery({
      keyword,
      userID: userId ? userId : 0,
      query,
      table: 'inventory'
    });
    res.status(200);
    res.send(JSON.stringify(inventoryData));
  } catch (error) {
    console.log(error, 'In db.ts');
    res.status(404);
    res.send('Resource not found');
  }
}