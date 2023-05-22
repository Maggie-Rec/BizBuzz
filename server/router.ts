import { Response, Request, Router } from 'express';
import { getAllCustomers } from './controllers/customers';
import { getAllItems } from './controllers/items';
import { getAllLocations } from './controllers/locations';
import { getAllTransactions } from './controllers/transactions';
import { loginUser, registerUser } from './controllers/authentication';
import { verifyToken } from './middleware/verify';
import uploadData from './controllers/upload';
import { getInventory } from './controllers/inventory';

export const router = Router();

router
  .post('/register', registerUser)
  .post('/login', loginUser)

  .post('/upload', verifyToken, uploadData)

  .post('/transactions', verifyToken, getAllTransactions)
  .post('/locations', verifyToken, getAllLocations)
  .post('/customers', verifyToken, getAllCustomers)
  .post('/items', verifyToken, getAllItems)
  .post('/inventory', verifyToken, getInventory)