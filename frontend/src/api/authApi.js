
 export async function login(context) {
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(context)
  }
  const body = await basicFetch("http://localhost:8000/detty/users/login/", payload)
  return body.token
}