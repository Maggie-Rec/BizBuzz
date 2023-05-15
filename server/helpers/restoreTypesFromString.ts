// TODO: FIX THE TYPE
export default function restoreTypesFromString(data: any) {
  data.record_id ? data.record_id = parseInt(data.record_id) : undefined;
  data.transaction_id ? data.transaction_id = parseInt(data.transaction_id) : undefined;
  data.location_id ? data.location_id = parseInt(data.location_id) : undefined;
  data.quantity ? data.quantity = parseFloat(data.quantity) : undefined;
  data.is_member ? data.is_member = Boolean(data.is_member) : undefined;
  data.customer_id ? data.customer_id = parseInt(data.customer_id) : undefined;
  data.tax ? data.tax = parseFloat(data.tax) : undefined;
  data.total_with_tax ? data.total_with_tax = parseFloat(data.total_with_tax) : undefined;

  data.id ? data.id = parseInt(data.id) : undefined;
  data.price_no_tax ? data.price_no_tax = parseFloat(data.price_no_tax) : undefined;
  data.age ? data.age = parseInt(data.age) : undefined;

  return data;
}