import { Response, Request, Router } from 'express';
import { getAllCustomers } from './controllers/customers';
import { getAllItems } from './controllers/items';
import { getAllLocations } from './controllers/locations';
import { getAllTransactions } from './controllers/transactions';
import { createAccount } from './controllers/createAccount';

export const router = Router();

router.get('/test', ((req: Request, res: Response) => {
  res.send('Hello world');
}));

router
  .post('/register', createAccount)

  .post('/transactions', getAllTransactions)
  .post('/locations', getAllLocations)
  .post('/customers', getAllCustomers)
  .post('/items', getAllItems)