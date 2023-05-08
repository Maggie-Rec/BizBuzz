import { Decimal } from '@prisma/client/runtime';


export interface Transaction {
  record_id: bigint | string,
  transaction_id: number,
  date: Date,
  time: Date,
  location_id: number,
  SKU: string,
  quantity: Decimal,
  is_member: boolean,
  customer_id: number,
  tax: Decimal,
  total_with_tax: Decimal
}