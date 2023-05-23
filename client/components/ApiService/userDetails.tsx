import { PORT } from "./variables";
import { API_URL } from "./variables";

export async function postUserDetails(user) {
  try {
    // const resp = fetch(`http://localhost:${PORT}/user`, {
    const resp = fetch(`${API_URL}/user`, {
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
};
