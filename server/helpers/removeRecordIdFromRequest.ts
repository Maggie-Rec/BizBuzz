import { Request, Response, NextFunction } from 'express';
import { Transaction } from './../types/Transaction';

export function removeRecordId(req: Request, res: Response, next: NextFunction) {
  const { query } = req.body;
  // Check if recordID
  if (!Object.keys(query.select).includes('record_id')) {
    next();
    return;
  }
  const keys = Object.keys(query.select);
  let newquery = { where: query.where, select: <Transaction>{} };
  for (let key of keys) {
    newquery.select[key] = query.select.key;
  }
  next();
}