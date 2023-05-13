export async function getLogin(creds) {
    try{
        const response = await fetch("http://localhost:3020/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds)
        });

    }catch (error) {
        throw new Error(error)
    }
}