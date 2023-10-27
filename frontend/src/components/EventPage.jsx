import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { event } from "../api/authApi";


export default function all_Events() {
  const [info, setInfo] = useState(null);
  // const { date } = useParams();
  // console.log(date)

  const all = async() => {
    // e.preventDefault();
    const response = await event.get("")
    console.log(response.data)
    if (response.status === 200) {
      const data = await response.data;
      setInfo(data)
    } else{
      setInfo(null)
    }
  };

  useEffect(() => {
    all()
  }, [])


  return (
    <div>
      <h2>Events</h2>
      {info && info.length > 0 ? (
        <ul>
          {info.map((eventItem) => (
            <li key={eventItem.pk}>
              <h3>{eventItem.fields.event_name}</h3>
              <p>Date: {eventItem.fields.date}</p>
              <p>Location: {eventItem.fields.location}</p>
              <p>Time: {eventItem.fields.time}</p>
              <p>Description: {eventItem.fields.event_des}</p>
            </li>
          ))}
        </ul>
      ) : (
          <p>No events available.</p>
        )}
    </div>
  );
}
  