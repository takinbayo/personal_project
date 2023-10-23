import { Link, Outlet } from "react-router-dom";
import { createContext } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { api } from "./api/authApi";
import { useNavigate } from "react-router-dom"

export const userContext = createContext();


function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
  }, [user])

  const whoAmI = async() => {
    let token = localStorage.getItem("token")
    if (token){
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("info/")
      setUser(response.data)
      navigate("home")
    }
    else{
      setUser(null)
      navigate("login")
    }
    
  }
  return (
    <div className="text-center min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold font-serif">Detty December</h1>
      <nav>
        <ul>
          <Link to ="/Home" className="mr-4">Home</Link>
          <button onClick={()=>setUser(null)}>Log Out</button>
          <Link to ="/About"className="mx-4">About</Link>
          <Link to ="/Event/2023-12-18"className="ml-4">Events</Link>
        </ul>
      </nav>
      <userContext.Provider value={{user, setUser}}>
        <Outlet />
      </userContext.Provider>
      
    </div>
  );

}

export default App;