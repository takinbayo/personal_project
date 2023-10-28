import React from 'react'
import '../App.css'
import { generateDate, months } from '../util/calendar';
import cn from '../util/cn';
import dayjs from 'dayjs'
import {useState, useEffect} from 'react'
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { event, image } from "../api/authApi";
// import { userContext } from '../App';

export default function Home() {
  // console.log(generateDate());
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate)
  const [eventDate, setEventDate] = useState(null)
  const [poster, setPoster] = useState(null)

  const screenData = async(selectDate) => {
    // e.preventDefault();
    const formatDate = selectDate.format('YYYY-MM-DD');
    const response = await event.get(`${formatDate}`)
    // console.log(response.data)
    if (response.status === 200) {
      const data = await response.data;
      console.log(eventDate)
      setEventDate(data)
    } else{
      setEventDate(null)
    }
  };

  const photos = async() => {
    // e.preventDefault()
    const response = await image.get("")
    console.log(response.data.image_url)
    if (response.status === 200) {
      const data = await response.data;
      setPoster(data)
    } else {
      setPoster(null)
    }
  }

  useEffect(() => {
    screenData(selectDate)
    photos()
  }, [selectDate])

  // console.log(poster)
    
    
  

  
  return (
    <div className='flex w-1/2 mx-auto divide-x-2 gap-10 h-screen items-center'>
      <div className='w-96 h-96'>
        <div className="flex justify-between">
          <h1 className='font-semibold'>{months[today.month()]}, {today.year()}</h1>
        </div>
        <div className='flex items-center gap-5'>
          <GrFormPrevious className='w-5 h-5 cursor-pointer' onClick={() => {

            setToday(today.month(today.month() - 1));

          }}/>
          <h1 className='cursor-pointer' onClick={() => {
            setToday(currentDate)
          }}>Today</h1>
          <GrFormNext className='w-5 h-5 cursor-pointer' onClick={() => {

            setToday(today.month(today.month() + 1));

          }}/>
        </div>
        <div className="w-full grid grid-cols-7 text-gray-500">
          {days.map((day, index) => {
            return <h1 key={index}className="h-14 grid place-content-center text-sm">{day}</h1>
          })}
        </div>

        <div className="w-full grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(({date, currentMonth, today}, index) => {
            return (
              <div key={index} className="h-14 border-t grid place-content-center text-sm">
                <h1 className={cn(currentMonth?"":"text-gray-400",
                today ? "bg-red-600 text-white": "",
                selectDate.toDate().toDateString() === date.toDate().toDateString()? "bg-black text-white" : "",
                "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"
                )}
                onClick={() => {
                  setSelectDate(date);
                  screenData(date)
                  photos()
                }}
                
                >{date.date()}</h1>
              </div>
            );

          })}
        </div>
      </div>
      <div className='h-96 w-96 px-5'>
        <h1 className='font-semibold'>Events On {selectDate.toDate().toDateString()}</h1>
         
        {poster ? (
          // let pic = poster.data.image_url
          // console.log(poster.data.image_url)
          <div>
            <img src={poster.image_url} alt="Event Poster" />
          </div>
          
        ) : (
          <p>Image not Available.</p>
          // <img src={poster.data.image_url} alt="Event Poster" />
        )}

        {eventDate ? (
          // console.log(eventDate.fields.event_name)
          <div className='bg-white p-4 rounded-lg shadow w-96'>
            <h4 className="text-2xl font-semibold mb-2">Event Details</h4>
            <p className='text-md'>Event Name: {eventDate.fields.event_name}</p>
            <p className='text-md'>Event Description: {eventDate.fields.event_des}</p>
            <p className='text-md'>Location: {eventDate.fields.location}</p>
            {/* <p>Date: {eventDate.flields.date}</p> */}
            <p className='text-md'>Owner: {eventDate.fields.owner}</p>
            <p className='text-md'>Time: {eventDate.fields.time}</p>
          </div>
        ) : (
          <p>No scheduled events today.</p>
        )}
       
      </div>
    </div>
  );
}