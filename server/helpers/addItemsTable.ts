import fs from 'node:fs';
import { getPathToSchema } from '../helpers/getPathToSchema';

export function createItemSchema(userID: string) {
  return `model Item_${userID} {
    SKU                 String          @id
    transactions        Transaction_${userID}[]
    unit_of_measurement String
    description         String
    category            String
    price_no_tax        Decimal
  }
  `
};

export function addItemsTable(userID: string) {
  fs.appendFileSync(getPathToSchema(), createItemSchema(userID));
}