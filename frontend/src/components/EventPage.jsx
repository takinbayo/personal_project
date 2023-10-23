import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import Event from "../api/authApi";


export default function Single_event() {
  const [event, setEvent] = useState(null);
  const { date } = useParams();
  // console.log(date)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/${date}/`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      })
  }, [])

  console.log(event)

  return <h2>Events</h2>
}