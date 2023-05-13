// Functions to translate client-side terms (e.g. 'salesValue)
// into things understood by queries to server

export function translateQuantity(input) {
  if (input = 'salesValue') {
    return {
      key: "_sum",
      val: {
        "total_with_tax": true
      }
    }
  } else if (input = 'salesQuantity') {
    return {
      key: "_sum",
      val: {
        "quantity": true
      }
    }
  } else if (input = 'transactionsQuantity') {
    return {
      key: "_count",
      val: {
        "total_with_tax": true
      }
    }
  }
  return undefined;
}