// import * as dotenv from 'dotenv';
// import { Server } from 'http';
// dotenv.config();
// console.log(process.env.SERVER_URL);
// NB.The above runs into difficulties with imports, which took us a mornign to resolve in the server;
// I'm not going to mess with imports in the front end if I can avoid it.
import { filterString } from "./stringFilter";
import { API_URL } from "../components/ApiService/variables";

// const SERVER_URL = 'http://localhost:3020';
const SERVER_URL = API_URL;

export async function makeFetchRequest({ queryObject, route = 'transactions' }) {

  try {
    let response = await fetch(SERVER_URL + '/' + route, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: queryObject,
      credentials: "include"
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
