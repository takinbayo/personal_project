import React from 'react'
import '../App.css'
import { generateDate, months } from '../util/calendar';
import cn from '../util/cn';
import dayjs from 'dayjs'
import {useState, useEffect} from 'react'
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { event } from "../api/authApi";
// import { userContext } from '../App';

export default function Home() {
  // console.log(generateDate());
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate)
  const [eventDate, setEventDate] = useState(null)

  const screenData = async(selectDate) => {
    // e.preventDefault();
    const formatDate = selectDate.format('YYYY-MM-DD');
    const response = await event.get(`${formatDate}`)
    // console.log(response.data)
    if (response.status === 200) {
      const data = await response.data;
      setEventDate(data)
    } else{
      setEventDate(null)
    }
  };

  useEffect(() => {
    screenData(selectDate)
  }, [selectDate])
    
    
  

  
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
                }}
                
                >{date.date()}</h1>
              </div>
            );

          })}
        </div>
      </div>
      <div className='h-96 w-96 px-5'>
        <h1 className='font-semibold'>Schedule for {selectDate.toDate().toDateString()}</h1>
        {eventDate ? (
          // console.log(eventDate.fields.event_name)
          <div>
            <p>Event Name: {eventDate.fields.event_name}</p>
            <p>Event Description: {eventDate.fields.event_des}</p>
            <p>Location: {eventDate.fields.location}</p>
            {/* <p>Date: {eventDate.flields.date}</p> */}
            <p>Owner: {eventDate.fields.owner}</p>
            <p>Time: {eventDate.fields.time}</p>
          </div>
        ) : (
          <p>No meetings for today.</p>
        )}
       
      </div>
    </div>
  );
}