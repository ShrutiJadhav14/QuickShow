import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import TimeFormat from '../lib/TimeFormat'
import { dateFormat } from '../lib/DateFormat'

const MyBookings = () => {
  const currency=import.meta.env.VITE_CURRENCY
  const [bookings,setBokkings]=useState([])
  const [isLoading, setIsLoading]=useState(true)
  const getMyBookings=async () =>{
    setBokkings(dummyBookingData)
    setIsLoading(false)
  }
  useEffect(()=>{
    getMyBookings()
  },[])
  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh'> 
      <BlurCircle top="100px" left='100px'/>
      <div>
      <BlurCircle bottom="0px" left='600px'/>

      </div>
      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>
      {bookings.map((item,index)=>(
        <div key={index} className='flex flex-col md:flex-row justify-between bg-red-400/8 border border-red-400/20 rounded-lg mt-4 pt-2 max-w-3xl'>
          <div className='flex flex-col md:flex-row'>
          <img src={item.show.movie.poster_path} alt=""  className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'/> 
          <div className='flex flex-col p-4'>
            <p className='text-lg font-semibold'>{item.show.movie.title}</p>
            <p className='text-gray-400 text-sm'>{TimeFormat(item.show.movie.runtime)}</p>
            <p className='text-gray-400  text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>

            </div>
            </div>
            <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
              <div className='flex items-centyer gap-4'>
                <p text-2xl font-semibold mb-3>{currency}{item.amount}</p>
                {!item.isPaid && <button className='bg-red-400 px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer '>Pay Now</button>
                }

                </div>
                <p ><span className='text-gray-400'> Total Tickets:</span>{item.bookedSeats.length}</p>
                <p ><span className='text-gray-400'> Seat Numbers:</span>{item.bookedSeats.join(" ,")}</p>

              </div>
          </div>
      ))}
    </div>
  ): 
    <h1>Loading</h1>
  }

export default MyBookings
