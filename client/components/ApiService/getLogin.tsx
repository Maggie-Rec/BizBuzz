import { PORT } from "./variables";
import { API_URL } from "./variables";

export async function getLogin(creds) {
  try {
    // const response = await fetch(`http://localhost:${PORT}/login`, {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
      credentials: "include",
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
