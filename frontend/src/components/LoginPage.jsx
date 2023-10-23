import { useState, useContext } from "react";
import { userContext } from "../App";

export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);

  return (
    <form onSubmit={(e) => setUser(userName)}>
      <h5>Log In</h5>
      <input 
        type="email"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>

  )
}