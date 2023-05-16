export default async function registerUser(password) {
  try {
    const resp = fetch("http://localhost:3020/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => data);
    return resp;
  } catch (error) {
    throw new Error(error);
  }
}
