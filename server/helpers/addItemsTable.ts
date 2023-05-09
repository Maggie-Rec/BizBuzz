import fs from 'node:fs';
import { getPathToSchema } from '../helpers/getPathToSchema';

export function createItemSchema(userID: number) {
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

export function addItemsTable(userID: number) {
  fs.appendFileSync(getPathToSchema(), createItemSchema(userID));
}