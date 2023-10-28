import { useState, useContext } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { api } from "../api/authApi";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate()

  const logIn = async(e) => {
    e.preventDefault();
    let response = await api.post("login/", {
      "email": userName,
      "password": password
    })
    // console.log(response)
    .catch((err)=> {
      alert("Invalid Credentials")
    })
    let user = response.data.user
    let token =  response.data.token
    setUser(user)
    localStorage.setItem("token", token)
    api.defaults.headers.common["Authorization"] = `Token ${token}`
    navigate("/home")
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={(e) => logIn(e)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{
          position: 'absolute',
          bottom: '0',
        }}
      >
        <h5 className="text-2xl text-center mb-4">Log In</h5>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="text-center">
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>

  )
}

export default LoginPage;