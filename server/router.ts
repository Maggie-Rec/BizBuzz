import { Response, Request, Router } from 'express';
import { getAllTransactions, getAllLocations, getAllCustomers, getAllItems } from './controllers/db';

export const router = Router();

router.get('/test', ((req: Request, res: Response) => {
  res.send('Hello world');
}));

router.post('/transactions', getAllTransactions)
  .post('/locations', getAllLocations)
  .post('/customers', getAllCustomers)
  .post('/items', getAllItems);