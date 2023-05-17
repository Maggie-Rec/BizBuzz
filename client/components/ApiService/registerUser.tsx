import { PORT } from "./variables";

export async function registerUser(user) {
  try {
    const resp = fetch(`http://localhost:${PORT}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => data);
    return resp;
  } catch (error) {
    throw new Error(error);
  }
}
