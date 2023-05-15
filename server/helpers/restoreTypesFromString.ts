// TODO: FIX THE TYPE
export default function restoreTypesFromString(data: any) {
  data.record_id ? data.record_id = Number(data.record_id) : undefined;
  data.transaction_id ? data.transaction_id = Number(data.transaction_id) : undefined;
  data.location_id ? data.location_id = Number(data.location_id) : undefined;
  data.quantity ? data.quantity = Number(data.quantity) : undefined;
  data.is_member ? data.is_member = Boolean(data.is_member) : undefined;
  data.customer_id ? data.customer_id = Number(data.customer_id) : undefined;
  data.tax ? data.tax = Number(data.tax) : undefined;
  data.total_with_tax ? data.total_with_tax = Number(data.total_with_tax) : undefined;

  data.id ? data.id = Number(data.id) : undefined;
  data.price_no_tax ? data.price_no_tax = Number(data.price_no_tax) : undefined;
  data.age ? data.age = Number(data.age) : undefined;

  return data;
}