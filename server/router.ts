import { Response, Request, Router } from 'express';
import { getAllCustomers } from './controllers/customers';
import { getAllItems } from './controllers/items';
import { getAllLocations } from './controllers/locations';
import { getAllTransactions } from './controllers/transactions';
import { loginUser, registerUser } from './controllers/authentication';
import { verifyToken } from './middleware/verify';

export const router = Router();

router.get('/test', ((req: Request, res: Response) => {
  res.send('Hello world');
}));


// TODO: INTERPOSE VERIFICATION MIDDLEWARE
router
  .post('/register', registerUser)
  .post('/login', loginUser)

  .post('/transactions', /* verifyToken, */ getAllTransactions)
  .post('/locations', /* verifyToken, */ getAllLocations)
  .post('/customers', /* verifyToken, */ getAllCustomers)
  .post('/items', /* verifyToken, */ getAllItems)