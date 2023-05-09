import fs from 'node:fs';
import { getPathToSchema } from '../helpers/getPathToSchema';



export function createTransactionSchema(userID: number) {
  return `model Transaction_${userID} {
    record_id      BigInt   @id @default(autoincrement())
    transaction_id Int
    date           DateTime @db.Date
    time           DateTime @db.Time(6)
    location       Location_${userID} @relation(fields: [location_id], references: [id], onDelete: Cascade, onUpdate: Cascade)
    location_id    Int
    item           Item_${userID} @relation(fields: [SKU], references: [SKU], onDelete: Cascade, onUpdate: Cascade)
    SKU            String
    quantity       Decimal  @db.Decimal
    is_member      Boolean
    customer       Customer_${userID} @relation(fields: [customer_id], references: [id], onDelete: Cascade, onUpdate: Cascade)
    customer_id    Int
    tax            Decimal  @db.Decimal
    total_with_tax Decimal  @db.Decimal
  }
  `
};

export function addTransactionsTable(userID: number) {
  fs.appendFileSync(getPathToSchema(), createTransactionSchema(userID));
}