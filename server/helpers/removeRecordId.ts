export function removeRecordId(obj) {
  let copy = { ...obj };
  for (let key in obj) {
    if (typeof obj.key === 'object') {
      obj.key = removeRecordId(obj.key);
    }
    if (key = 'record_id') {
      obj.record_id = 0;
    }
  }
  return copy;
}