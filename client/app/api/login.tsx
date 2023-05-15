interface RequestBody {
    username: string,
    password: string,
}

export async function Post(request:Request) {
const body: RequestBody = await request.json();
}