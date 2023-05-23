
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
export function generateAggSumQuery({ filterArr = [], filterNames = [], dateArr = [NaN as any, NaN as any], keyword = 'findAll', operator }) {
  // console.log({ filterArr, filterNames });
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

  // FILTERS
  let customerFilters = [];
  let locationFilters = [];
  let itemFilters = [];

  // FILTER FOR PROPERTIES OF TRANSACTION ITSELF (INCLUDING LOCATION)
  for (let i = 0; i < filterArr.length; i++) {
    console.log(filterArr[i]);
    console.log(filterNames[i]);

    if (filterNames[i] === 'location_id' || filterNames[i] === 'location') {
      console.log('location filter detected');
      let locationFilters = [];
      if (Array.isArray(filterArr)[i]) {
        for (let location of filterArr[i][1]) {
          locationFilters.push({
            location_id: location
          });
        };
        if (locationFilters.length === 0) {
        } else if (locationFilters.length === 1) {
          queryObj.query.where.AND.push(locationFilters[0]);
        } else {
          queryObj.query.where.AND.push({
            OR: locationFilters
          });
        }
      } else {
        queryObj.query.where.AND.push(filterArr[i]);
      }

    }
    else if (filterNames[i] === 'is_member') {
      queryObj.query.where.AND.push({ is_member: filterArr[i][1][0] })
    }
    else if (filterNames[i] === 'quantity') {
      if (!Array.isArray(filterArr[i][1])) {
        queryObj.query.where.AND.push({ quantity: filterArr[i][1] });
      } else {
        queryObj.query.where.AND.push({
          quantity: { gt: filterArr[i][1][0] }
        });
        queryObj.query.where.AND.push({
          quantity: { lt: filterArr[i][1][1] }
        });
      }
      // FILTER FOR PROPERTIES ONLY ACCESSIBLE THROUGH LOCATION
    } else if (filterNames[i] === 'region') {
      if (filterArr[i][1].length === 1) {
        locationFilters.push({
          region: filterArr[i][1][0]
        });
      } else {
        let allowableRegions = [];
        for (let allowableRegion of filterArr[i][1]) {
          allowableRegions.push({
            gender: allowableRegion
          })
        };
        locationFilters.push({
          OR: allowableRegions
        });
      }
      // FILTER FOR PROPERTIES OF CUSTOMER
    } else if (filterNames[i] === 'gender') {
      if (filterArr[i][1].length === 1) {
        customerFilters.push({
          gender: filterArr[i][1][0]
        });
      } else {
        let allowableGenders = [];
        for (let allowableGender of filterArr[i][1]) {
          allowableGenders.push({
            gender: allowableGender
          })
        };
        customerFilters.push({
          OR: allowableGenders
        });
      }
    } else if (filterNames[i] === 'age') {
      if (filterArr[i][1].length === 1) {
        customerFilters.push({
          gender: filterArr[i][1][0]
        });
      } else {
        if (!Array.isArray(filterArr[i][1])) {
          customerFilters.push({ quantity: filterArr[i][1] });
        } else {
          customerFilters.push({
            age: { gt: filterArr[i][1][0] }
          });
          customerFilters.push({
            age: { lt: filterArr[i][1][1] }
          });
        }
      }
    }
  }


  // RE-ADD CUSTOMER, LOCATION, ITEM FILTERS
  for (let [filters, category] of [
    [customerFilters, 'customer'],
    [locationFilters, 'location'],
    [itemFilters, 'item']
  ]) {
    if (filters.length === 0) {

    } else if (filters.length === 1) {
      queryObj.query.where.AND.push({
        // @ts-ignore
        [category]: filters[0]
      });
    } else {
      queryObj.query.where.AND.push({
        // @ts-ignore
        [category]: {
          AND: filters
        }
      })
    }
  }
  // console.log(queryObj)
  // DELETE AND or OR WHERE FIELDS IF THEY ARE EMPTY
  // OTHERWISE DB FETCH DOESNT WORK
  if (queryObj.query.where.AND.length === 0) delete queryObj.query.where.AND;
  if (queryObj.query.where.OR.length === 0) delete queryObj.query.where.OR;


  return JSON.stringify(queryObj);
}
