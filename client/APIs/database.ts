const PORT = 3456;

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
    })
  });
  response = await response.json();
  return response;
}