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
      navigate("/home")
    }
    else{
      setUser(null)
      navigate("/login")
    }
    
  }

  useEffect(() =>{
    whoAmI()
  }, [])

  const logOut = async() => {
    let response = await api.post("logout/")
    if (response.status === 204){
      localStorage.removeItem("token")
      setUser(null)
      delete api.defaults.headers.common["Authorization"];
      navigate("/login")
    }
  }
  // text-center min-h-screen flex flex-col

  return (
    <div>
      <div className=" background-container">
        <header>
          <h1 className="text-4xl text-center text-white font-bold font-serif">Detty December</h1>
        </header>
        <div className="text-center mt-4">
          <nav>
            {
              user 
              ?
              <>
              <Link to ="/home" className="mr-4">Home</Link>
              <button onClick={logOut}>Log Out</button>
              <Link to ="/about"className="mx-4">About</Link>
              <Link to ="/event/"className="ml-4">Events</Link>
              </>
              :
              <>
              <Link to ="/login" className="mr-4">Log In</Link>
              <Link to ="/" className="mx-4">Sign Up</Link>
              </>
            }   
          </nav>
        </div>
          <userContext.Provider value={{user, setUser}}>
            <Outlet />
          </userContext.Provider>
      </div>
    </div>
  );

}

export default App;