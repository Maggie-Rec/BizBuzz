import fs from 'node:fs';
import { getPathToSchema } from '../helpers/getPathToSchema';

export function createCustomerSchema(userID: number) {
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

export function addCustomersTable(userID: number) {
  fs.appendFileSync(getPathToSchema(), createCustomerSchema(userID));
}