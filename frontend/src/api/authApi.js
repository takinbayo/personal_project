import axios from 'axios'

// 54.196.198.220
// "http://127.0.0.1:8000/detty/users/"
const base_url = import.meta.env.VITE_BASE_URL

export const api = axios.create({
  baseURL: `http://${base_url}/detty/users/`
})

export const event = axios.create({
  baseURL: `http://${base_url}/detty/`
})

export const image = axios.create({
  baseURL: `http://${base_url}/detty/images`
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