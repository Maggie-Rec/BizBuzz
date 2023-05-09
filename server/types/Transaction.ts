import { Decimal } from '@prisma/client/runtime';


export interface Transaction {
  record_id: BigInt | string,
  transaction_id: number,
  date: Date,
  time: Date,
  location_id: number,
  SKU: string,
  quantity: Decimal,
  is_member: Boolean,
  customer_id: number,
  tax: Decimal,
  total_with_tax: Decimal
}