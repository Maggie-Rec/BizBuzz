// import * as dotenv from 'dotenv';
// import { Server } from 'http';
// dotenv.config();
// console.log(process.env.SERVER_URL);
// NB.The above runs into difficulties with imports, which took us a mornign to resolve in the server;
// I'm not going to mess with imports in the front end if I can avoid it.

const SERVER_URL = 'http://localhost:3005';
import { filterString } from "./stringFilter";

export async function makeFetchRequest({ queryObject, route = 'transactions' }) {
  try {
    console.log('queryObject:', queryObject);
    let response = await fetch(SERVER_URL + '/' + route, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: queryObject
    });
    console.log(response.status);
    response = await response.json();
    console.log('response:', response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
