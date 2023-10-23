import axios from 'axios'


export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/detty/users/"
})





// export async function Login(context) {
//   const payload = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(context)
//   }
//   const body = await basicFetch("http://localhost:8000/detty/users/login/", payload)
//   return body.token
// }

// export async function Event(context) {
//   const payload = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(context)
//   }
//   const body = await basicFetch(`http://localhost:8000/detty/${date}`, payload)
//   return body.token
// }