import { Location } from "../../utils/types";
import { PORT } from "./variables";

const baseUrl = `http://localhost:${PORT}`

export default async function fetchTransactionData(query, keyword) {
  let response = await fetch(baseUrl + '/transactions', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query,
      keyword: keyword
    }),
    credentials: "include"
  });
  response = await response.json();
  return response;
};

export async function fetchLocations(query = {}) {
  let response = await fetch(baseUrl + '/locations', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query
    }),
    credentials: "include"
  });
  response = await response.json();
  return response;
};

export async function uploadData(formDataObject: FormData) {
  console.log(formDataObject.get("data"), formDataObject.get("file"));
  let response = await fetch(baseUrl + '/upload', {
    method: "POST",
    body: formDataObject,
    credentials: "include"
  });
  return response;
};

export async function addLocation(locationObj: Location) {
  console.log(locationObj);
  let response = await fetch(baseUrl + '/locations', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: {
        data: [locationObj]
      }
    }),
    credentials: "include"
  });
  response = await response.json();
  return response;
};