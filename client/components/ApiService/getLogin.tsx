export async function getLogin(creds) {
<<<<<<< HEAD
    try{
        const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
            credentials: "include"
        });

    }catch (error) {
        throw new Error(error)
    }
}
=======
  try {
    const response = await fetch("http://localhost:3020/login", {
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
>>>>>>> refactor-new
