import { Response, Request, Router } from 'express';
import { getAllTransactions } from './controllers/db';

export const router = Router();

router.get('/test', ((req: Request, res: Response) => {
  res.send('Hello world');
}));

router.get('/db', getAllTransactions);