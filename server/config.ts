import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

export const port = process.env.PORT;
export const secret = process.env.SECRET;