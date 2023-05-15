export interface Transaction {
  record_id: number,
  transaction_id: number,
  date: Date,
  time: Date,
  location_id: number,
  SKU: string,
  quantity: number,
  is_member: boolean,
  customer_id: number,
  tax: number,
  total_with_tax: number
}