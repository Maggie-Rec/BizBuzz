export async function getRandomPerson() {
  const url = new URL(`https://randomuser.me/api/`);
  let response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  response = await response.json();
  return response;
};
