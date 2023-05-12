// import * as dotenv from 'dotenv';
// import { Server } from 'http';
// dotenv.config();
// console.log(process.env.SERVER_URL);
// NB.The above runs into difficulties with imports, which took us a mornign to resolve in the server;
// I'm not going to mess with imports in the front end if I can avoid it.

const SERVER_URL = 'http://localhost:3005';

export async function makeFetchRequest({ queryObject, route = 'transactions', keyword = 'findAll' }) {
  const body = { ...queryObject };
  if (!body.keyword) body.keyword = keyword;
  let response = await fetch(SERVER_URL + '/' + route, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body)
  });
  response = await response.json();
  return response;
}
