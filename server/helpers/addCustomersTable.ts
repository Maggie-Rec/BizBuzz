import fs from 'node:fs';
import { getPathToSchema } from '../helpers/getPathToSchema';

export function createCustomerSchema(userID: string) {
  return `model Customer_${userID} {
    id           Int             @id
    transactions Transaction_${userID}[]
    name         String
    age          Int
    email        String
    gender       String
  }
  `
};

export function addCustomersTable(userID: string) {
  fs.appendFileSync(getPathToSchema(), createCustomerSchema(userID));
}