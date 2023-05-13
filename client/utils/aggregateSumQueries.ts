
// KEY MAPPING FOR PRISMA SCHEMA (refer to server/prisma/schema.prisma)
// CHECK TRANSACTION PROPERTIES WITH 3RD COLUMN --> @relation(...)
const prismaKeysMap = new Map<string, string>();
prismaKeysMap.set('location_id', 'location');
prismaKeysMap.set('SKU', 'item');
prismaKeysMap.set('customer_id', 'customer');

// BASE PARAMS WE QUERY IN THE DIFFERENT TABLES
// location --> region,city & type by default
// item --> description & category by default
// customer --> name, age & gender by default
const baseQueryParams = new Map<string, string[]>();
baseQueryParams.set('location', ['region', 'city', 'type']);
baseQueryParams.set('item', ['description', 'category']);
baseQueryParams.set('customer', ['name', 'age', 'gender']);

// ACTUAL FUNCTION THAT WILL GET CALLED FROM THE FRONTEND
// filterArr --> ARRAY CONTAINING FILTERS e.g. --> ["location-id:1", "location-id:3", "location-id:4", "SKU", "date"]
// dateArr --> ARRAY CONTAINING DATE RANGE e.g. --> [startDate, endDate]
export function generateAggSumQuery({ filterArr, dateArr, keyword = 'findAll', operator }) {

  // EMPTY INITIAL QUERY OBJECT
  const queryObj = {
    query: {
      [operator.key]: operator.val,
      where: {
        AND: [],
        OR: []
      },
    },
    keyword: keyword
  }
  // CHECK IF THERE'S A CUSTOM DATE RANGE (IF DATES ARE INVALID ==> NO CUSTOM DATE RANGE)
  if (!isNaN(dateArr[0].getDate()) && !isNaN(dateArr[1].getDate())) {
    // YES --> THEN SET THAT ON THE QUERY OBJECT
    queryObj.query.where.AND = [
      {
        date: {
          gt: dateArr[0]
        }
      },
      {
        date: {
          lt: dateArr[1]
        }
      }
    ]
  }

  // CHECK IF WE ARE FILTERING THROUGH SPECIFIC PROPERTIES (--> PUT IT IN where IN QUERY)
  for (let filter of filterArr) {
    queryObj.query.where.AND.push(filter);
  }


  // DELETE AND or OR WHERE FIELDS IF THEY ARE EMPTY
  // OTHERWISE DB FETCH DOESNT WORK
  if (queryObj.query.where.AND.length === 0) delete queryObj.query.where.AND;
  if (queryObj.query.where.OR.length === 0) delete queryObj.query.where.OR;


  return JSON.stringify(queryObj);
}
