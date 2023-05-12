
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

// REUSABLE SELECT BLOCK FOR NESTING
function SelectBlock(propertyToSelect: string): [string, {}] {
  if (prismaKeysMap.get(`${propertyToSelect}`) === null) throw new Error();

  // KEY OF THE NEW SELECT BLOCK
  // TRANSLATED FROM THE FE VALUE THROUGH THE MAP ON TOP
  const key = prismaKeysMap.get(`${propertyToSelect}`) || '';
  const propertyArr = baseQueryParams.get(`${key}`) || [''];

  // BASE SELECT OBJECT
  let newSelectBlock = { [key]: { select: {} } };

  // ADD PROPERTIES WE WANT TO RETRIEVE
  propertyArr.forEach((el) => {
    newSelectBlock = {
      [key]: {
        select: {
          // SPREAD CURRENT VALUE OF THE SELECT OBJECT <==> KINDOF Array.push() (ADD NEW PROPERTY TO EXISTING ONES)
          ...newSelectBlock[key].select,
          // USE ELEMENT AS KEY AND VALUE SET TO TRUE TO GET IT BACK FROM THE DB
          [el]: true
        }
      }
    };
  })

  return [key, newSelectBlock[key]];
}

// ACTUAL FUNCTION THAT WILL GET CALLED FROM THE FRONTEND
// filterArr --> ARRAY CONTAINING FILTERS e.g. --> ["location-id:1", "location-id:3", "location-id:4", "SKU", "date"]
// dateArr --> ARRAY CONTAINING DATE RANGE e.g. --> [startDate, endDate]
export function generateQuery(filterArr: string[] | object[], dateArr: Date[], keyword = 'findAll') {
  // Changed - now accepts string objects in the filter array. See also line 83
  // Also changed for optional keyword argument

  // EMPTY INITIAL QUERY OBJECT
  const queryObj = {
    query: {
      where: {
        AND: [],
        OR: []
      },
      select: {}
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

  // Lines 84 and 91 changed to not operate in cases where filters were already objects. See also line 51
  const propertyFilters = typeof filterArr[0] === 'string' ? (filterArr.filter((el) => el.includes(':'))) : filterArr;
  if (propertyFilters.length > 0) {
    // YES --> ADD THEM TO THE QUERY OBJECT
    propertyFilters.forEach((el) => {
      // e.g. "location_id:2".split(':') --> ["location_id", "2"]
      // --> property: 'location_id'
      // --> value we want to filter through: 2
      let property, value;
      if (typeof el === 'string') [property, value] = el.split(':');
      if (Array.isArray(el)) [property, value] = el;
      if (typeof el === 'object' && !Array.isArray(el)) console.log('Problem here, should be an array');
      // const [property, value] = (typeof el === 'string' ? el.split(':') : el);
      // The above, if uncommented, is new code to cover non-string properties
      // const [property, value] = el.split(':');
      queryObj.query.where.OR.push({ [property]: parseInt(value) }) // parseInt because we need integers in DB
    })
  }

  queryObj.query.select = {
    ...queryObj.query.select,
    record_id: true,
  }


  filterArr.forEach((el) => {
    if (!el.includes(':')) {
      switch (el) {
        case 'location_id':
        case 'SKU':
        case 'customer_id':
          const [newKey, newValue] = SelectBlock(el);
          queryObj.query.select = {
            ...queryObj.query.select,
            [newKey]: newValue
          }
          break;
        default:
          queryObj.query.select = {
            ...queryObj.query.select,
            [el]: true
          }
      }
    } else if (!queryObj.query.select[prismaKeysMap.get(`${el.split(':')[0]}`)]) {
      const newEl = el.split(':')[0];
      switch (newEl) {
        case 'location_id':
        case 'SKU':
        case 'customer_id':
          const [newKey, newValue] = SelectBlock(newEl);
          queryObj.query.select = {
            ...queryObj.query.select,
            [newKey]: newValue
          }
          break;
        default:
          queryObj.query.select = {
            ...queryObj.query.select,
            [newEl]: true
          }
      }
    }
  })

  queryObj.query.select = {
    ...queryObj.query.select,
    total_with_tax: true
  }

  // DELETE AND or OR WHERE FIELDS IF THEY ARE EMPTY
  // OTHERWISE DB FETCH DOESNT WORK
  if (queryObj.query.where.AND.length === 0) delete queryObj.query.where.AND;
  if (queryObj.query.where.OR.length === 0) delete queryObj.query.where.OR;

  // DELETE SELECT IF EMPTY
  // OTHERWISE DB FETCH DOESNT WORK
  if (Object.keys(queryObj.query.select).length === 0) delete queryObj.query.select;

  return JSON.stringify(queryObj);
}

// async function getLabelsPossibleValues() {
//   let filter = getFilterObject(pieChartSelection[1], 'value');
//   let path = Object.keys(filter)[0];
//   let relatedCriterion = filter[path];
//   Object.keys(relatedCriterion).forEach(key => relatedCriterion[key] = true);
//   let selection = relatedCriterion;

//   let response = await fetch(`http://localhost:3456/${path}s`, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       query: {
//         distinct: [`${Object.keys(relatedCriterion)[0]}`],
//         select: selection
//       }
//     })
//   });

//   response = await response.json();
//   console.log('Possible values', response);
//   return response;
// }