import { PORT } from "./variables";
import { API_URL } from "./variables";

export default async function registerUser(password) {
  try {
    // const resp = fetch(`http://localhost:${PORT}/changePassword`, {
    const resp = fetch(`${API_URL}/changePassword`, {
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
