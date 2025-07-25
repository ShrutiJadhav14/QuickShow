import React, { useState, useEffect } from 'react'
import Title from '../../components/admin/title';
import { dummyBookingData } from '../../assets/assets';
import { dateFormat } from '../../lib/DateFormat';
const ListBookings = () => {
    const currency =import.meta.env.VITE_CURRENCY
    const [bookings,setBookings]=useState([]);
    const [loading,setLoading]= useState(true);
 const getAllBookings= async  () =>{
  setBookings(dummyBookingData)
  setLoading(false);
 };
 useEffect(()=>{
  getAllBookings();
 }, []);
  return !loading ? (
    <>
      <Title text1="List" text2="Bookings"/>
      <div className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
        <thead>
          <tr className='bg-red-400/20 text-left text-white'>
          <th className='p-2 font-medium pl-5'>User Name</th>
          <th className='p-2 font-medium'>Movie name</th>
         <th className='p-2 font-medium'>show Time</th>
          <th className='p-2 font-medium'>Seats</th>
          <th className='p-2 font-medium'>Amount</th>
        </tr>
        </thead>
          <tbody className='text-sm font-light'>
                  {bookings.map((item,index) => (
                    <tr key={index} className='border-b border-red-400/10 bg-red-500/5 even:bg-red-500/10'>
                      <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
                      <td className='p-2'>{item.show.movie.title}</td>
                      <td className='p-2'>{dateFormat(item.show.showDateTime)}</td>
                      <td className='p-2'>{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(" ,")}</td>
                      <td className='p-2'>{currency} {item.amount}</td>
                    </tr>
                  ))}
        
                </tbody>
        </table>
      </div>
    </>
  ) :
  <p>loading</p>
}

export default ListBookings
