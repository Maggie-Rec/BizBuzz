# How to set up the server and the database for BizBuzz
*Updated 9 May 2023*

This instruction describes how to set up the server and the mock database. Standalone tables per user logic has been implemented, but for now we do not use it.

1. Install PostgresSQL on your machine, including pgAdmin 4 app.
2. Create a `.env` file in the `server` directory. Populate the file with the following values:

```
PORT = 3000
DATABASE_URL = "postgresql://postgres:PASSWORD@localhost:5432/bizbuzz?schema=public"
```
These are the port the server will work on and the connection string for Prisma ORM to connect to the database. Change `PASSWORD` to your database password, and `postgres` to your database user record, if you have changed the default user record in PostgresSQL.

`.env` file is included into the `.gitignore` so it won't go into the repository, and once you make it, it stays.

3. Go into the server directory with `cd server` and run the install command from the terminal `npm install`.
   
4. For reasons unknown `tsconfig.json` file in the top directory of the project breaks the server setup. Delete or rename the file, e.g. like `_tsconfig.json`. Later on we can figure out the reason or re-factor the project directory so that file lives in the `client` directory.
5. From the server directory terminal run command `npx prisma migrate dev --name init`. This command will look into the `prisma.schema` file and create the database and tables for you based on the models defined in that file. Later on this process will be automated and run on each user registration.
6. Populate the tables with mock data provided: run pgAdmin 4, go to `bizbuzz` database tables:

![pic](for_readme/pic.png)

Right click on each table and select the import item in the menu. Since the transactions table depends on the rest, import it last.

In the import dialog provide a path to the mock data file (look in `server/mocks` directory), in the options tab of the import dialog make sure that the `headers` switch is turned on.

7. After you finish the import you can start the server by running `nodemon ./index.ts` from the `server` directory. The server has the following endpoints exposed at the moment: 

```TypeScript
router.post('/transactions', getAllTransactions)
      .post('/locations', getAllLocations)
      .post('/customers', getAllCustomers)
      .post('/items', getAllItems)
      .post('/register', createAccount);
```
These allow you to run any getting queries on the database tables with transactions, locations, customers and items and use `findMany` method, so in each and every case you get back an array of objects in JSON format in response to a proper request.

These endpoints, however, do not allow to get aggregate values. This can be done on the front end or the back end later.

# How to make queries 

Here is how to make a query to the server and the database.

Prisma ORM uses object-like syntax for queries that imitates the structure of what you ask for and what you get. To make a query: 

1. Construct the query object with the `query` property that includes the query object. When constructing a query use the exact names of the fields in the tables. Please refer to the chart on Trello or the `prisma.schema` file for that.
2. Stringify this object with `JSON.stringify()` and include it in the body of the `POST` request to `http://localhost:3000/PATH`.

Examples of query objects with comments:

Warning: do not include `record_id` field in your queries. It exists only to be as a primary key in the transactions tables and serves no other purpose.

```TypeScript
// to get all records from a table - can be most useful for locations and items
{ 
  query: {}
}

// an example of a transactions query that returns transactions related to a specific location after 1 March 2023
// to get a filtered result include `where` into your query object
{
  query: {
    where: {
      location_id: 2, // returns all transactions related to a location id equal to 2
      // to filter based on date
      date: {
        // `gt` stands for `greater than`, there is also `lt` which is `less than`
        // date field accepts date strings in ISO format like this `2023-01-01T00:00:00.000Z`
        // you should be able to generate a string with a library or built-in `.toISOString()` method applicable to `Date` objects
        gt: "2023-03-01T08:00:00.009Z"
      }
    },
    // to specify which fields you need exactly include `select` into your query object
    select: {
      location_id: true,
      date: true,
      total_with_tax: true,
      is_member: true,
      // if you want to get information from a related table as well, e.g. location data, add `location` to select
      location: {
        // same principle here
        select: {
          name: true,
          region: true
        }
      },
      // to get item info from the related table
      item: {
        select: {
          description: true
        }
      }
    }
  }
}

// to get records related to a specific time period, e.g. 1 Mar 2023 and 7 Match 2023
// use AND operator that will give you data that meets all the conditions that go into an array
{
  query: {
    where: {
      AND: [
        {
          date: {
            gt: '2023-03-01T00:00:00.000Z'
          }
        },
        {
          date: {
            lt: '2023-03-07T00:00:00.000Z'
          }
        }
      ]
    }
  },
  select: {
    date: true,
    total_with_tax: true
  }
}

// to get records related to multiple locations - use OR operator and include an array
{ 
  query: {
    where: {
      OR: [{
        location_id: 2
      }, {
        location_id: 3
      }]
    },
    select: {
      location_id: true,
      total_with_tax: true
    }
  }
}
```
You can also use ==Prisma playground== to look at how queries are made: [link](https://playground.prisma.io/examples/reading/find/find-all?host=playground.prisma.io&path=examples).

`POST` `/register` route creates a new account, including new tables in database. At present creates these with a randomly generated userID between 0 and 9999.
