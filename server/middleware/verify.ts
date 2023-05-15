import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { secret } from '../config';

export async function verifyToken(request: Request, response: Response, next: NextFunction) {
  try {
    const token = request.cookies.token;
    if (!token) {
      response.status(403);
      response.send('Access denied');
      return;
    } else {
      const decrypt = jwt.verify(token, `${secret}`) as { id: string };
      const userId = decrypt.id;
      request.body.userId = userId;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};