// FUNCTION THAT RETURNS TOTAL AMOUNT FOR A MONTH
// DB returns ==> (e.g.) {"_sum":{"total_with_tax":"909.66"}}
function queryTotalAmountByMonth(dateRange: Date[]) {
  const queryObj = {
    query: {
      _sum: {
        total_with_tax: true
      },
      where: {
        AND: [
          {
            date: {
              gte: dateRange[0]
            }
          },
          {
            date: {
              lte: dateRange[1]
            }
          }
        ]
      }
    },
    keyword: 'aggregate'
  }

  return JSON.stringify(queryObj);
}

// FUNCTION THAT RETURNS TOTAL AMOUNT OF ITEMS SOLD FOR A MONTH
// DB returns ==> (e.g.) {"_sum":{"quantity":"3139.36"}} 
function queryTotalItemsByMonth(dateRange: Date[]) {
  const queryObj = {
    query: {
      _sum: {
        quantity: true
      },
      where: {
        AND: [
          {
            date: {
              gte: dateRange[0]
            }
          },
          {
            date: {
              lte: dateRange[1]
            }
          }
        ]
      }
    },
    keyword: 'aggregate'
  }

  return JSON.stringify(queryObj);
}

// FUNCTION THAT RETURNS TOTAL AMOUNT OF UNIQUE CUSTOMERS FOR A MONTH
// DB returns ==> (e.g.) [{"customer_id":0}, ..., {"customer_id":21}]
// JUST DO .length
function queryTotalCustomersByMonth (dateRange: Date[]) {
  const queryObj = {
    query: {
      where: {
        AND: [
          {
            date: {
              gte: dateRange[0]
            }
          },
          {
            date: {
              lte: dateRange[1]
            }
          }
        ]
      },
      select: {
        customer_id: true
      },
      distinct: ['customer_id']
    }
  }

  return JSON.stringify(queryObj);
}

// FUNCTION THAT RETURNS TOTAL AMOUNT OF UNIQUE TRANSACTIONS FOR A MONTH
// DB returns ==> (e.g.) [{"transaction_id":0}, ..., {"transaction_id":21}]
// JUST DO .length
function queryTotalTransactionsByMonth (dateRange: Date[]) {
  const queryObj = {
    query: {
      where: {
        AND: [
          {
            date: {
              gte: dateRange[0]
            }
          },
          {
            date: {
              lte: dateRange[1]
            }
          }
        ]
      },
      select: {
        customer_id: true
      },
      distinct: ['transaction_id']
    }
  }

  return JSON.stringify(queryObj);
}

// FUNCTION TO RETURN POSSIBLE PARAMETERS TO DISPLAY
function queryAllPossibleFilters () {
  const queryObj = {
    
  }

  return JSON.stringify(queryObj);
}

// FUNCTION TO RETURN ALL TRANSACTIONS FOR GIVEN PERIOD
// NO FILTERS APPLIED (==> default data for reports table)
function queryAllTransactions (dateRange: Date[]) {
  const queryObj = {
    query: {
      where: {
        AND: [
          {
            date: {
              gte: dateRange[0]
            }
          },
          {
            date: {
              lte: dateRange[1]
            }
          }
        ]
      }
    }
  }

  return JSON.stringify(queryObj);
}

// FUNCTION TO RETURN ALL POSSIBLE LOCATIONS
// DB returns ==> [{"id":1,"full_address":"Dean Bradley House, 52 Horseferry Rd","region":"Greater
// London","city":"London","type":"outlet"},{"id":2,"full_address":"105 Upper St, London N1 1QN","region":"Greater
// London","city":"London","type":"outlet"}]
function queryAllLocations () {
  const queryObj = {
    query: {
      distinct: ['full_address']
    }
  }

  return JSON.stringify(queryObj);
}

// FUNCTION TO RETURN ALL POSSIBLE ITEMS
// DB returns ==> [{"SKU":"sm0ik","unit_of_measurement":"item","description":"nuggets 3
// pcs","category":"starters","price_no_tax":"1.2"},{"SKU":"osv5f","unit_of_measurement":"item","description":"nuggets 6
// pcs","category":"starters","price_no_tax":"2"}
function queryAllItems () {
  const queryObj = {
    query: {
      distinct: ['SKU']
    }
  }

  return JSON.stringify(queryObj);
}

// FUNCTION TO RETURN ALL POSSIBLE CUSTOMERS
// DB returns ==> [{"id":0,"name":"Anonymous","age":0,"email":"anonymouse","gender":"anonymous"},{"id":1,"name":"Say
// Follos","age":87,"email":"sfollos0@cafepress.com","gender":"Male"}]
function queryAllCustomers () {
  const queryObj = {
    query: {
      distinct: ['id']
    }
  }

  return JSON.stringify(queryObj);
}