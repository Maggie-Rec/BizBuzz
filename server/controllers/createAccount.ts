import { Response, Request } from 'express';
import { execaCommand } from 'execa';
import { addTransactionsTable } from '../helpers/addTransactionsTable';
import { addItemsTable } from '../helpers/addItemsTable';
import { addLocationsTable } from '../helpers/addLocationsTable';
import { addCustomersTable } from '../helpers/addCustomersTable';

export async function createAccount(req: Request, res: Response) {
  let userID = Math.floor(Math.random() * 10000);
  // NB The above is a placeholder until we have properly-implemented tracking of users

  // any kind of verification? Or checking whether this is new business or new user for existing business?


  // add info to database of users


  // create new database tables for user transactions, locations, customers, items
  addTransactionsTable(userID);
  addItemsTable(userID);
  addLocationsTable(userID);
  addCustomersTable(userID);

  // Migrate to database
  // await execaCommand(`npx prisma migrate deploy --name added_transaction_${userID}`);
  await execaCommand('npx prisma db push');

  // send required info back to user
  res.status(201);
  res.send('Success response');
}
