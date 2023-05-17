import { PORT } from "./variables";

export async function getLogin(creds) {
  try {
    const response = await fetch(`http://localhost:${PORT}/login`, {
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
