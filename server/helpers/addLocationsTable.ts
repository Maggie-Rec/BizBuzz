import fs from 'node:fs';
import { getPathToSchema } from '../helpers/getPathToSchema';

export function createLocationSchema(userID: number) {
  return `model Location_${userID} {
    id           Int             @id @default(autoincrement())
    name         String
    full_address String
    region       String
    city         String
    type         String
    transactions Transaction_${userID}[]
  }
  `
};

export function addLocationsTable(userID: number) {
  fs.appendFileSync(getPathToSchema(), createLocationSchema(userID));
}