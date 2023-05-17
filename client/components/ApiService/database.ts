const PORT = 3001;

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