import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {dummyShowsData,dummyDateTimeData, assets} from "../assets/assets"
import { ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/ISOTimeformat'
import BlurCircle from '../components/BlurCircle'
const SeatLayout = () => {
  const groupRows=[["A","B"], ["C","D"],["E","F"],["G","H"]]
  const {id, date}= useParams()
const [selectedSeats,setSelectedSeats]=useState([])
const[selectedTime,setSelectedTime]=useState(null)
const [show,setShow]=useState(null)

const navigate=useNavigate()
const getShow=async () =>{
  const show=dummyShowsData.find(show => show._id === id)
  if(show){
    setShow({
      movie:show,
      dateTime:dummyDateTimeData
    })
  }
}
const handleSeatClick=(seatId) =>{
  if(!selectedTime)
  {
    return toast("please select time first")
  }
  if(!selectedSeats.include(seatId) && selectedSeats.length >4){
    return toast ("you can onlu chhose 5 seats")
  }
  setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev,seatId])
}
const renderSeats=(row,count=9)=>
(
  <div key={row} className='flex gap-2 mt-2'>
    <div className='flex flex-wrap items-center justify-center gap-2'>
      {Array.from({length:count}, (_,i) =>{
        const seatId = `${row}${i+1}`;
        return (
          <button key={seatId} onClick={()=> handleSeatClick(seatId)} className={`h-8 w-8 rounded border-red-400/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-red-400 text-white"}`}>{seatId}</button>
        )
      })}
    </div>
  </div>
)


useEffect(()=>{
  getShow()
}
)
  return show? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Avail timing */}
      <div className='w-60 bg-red-400/10 border border-red/20 rounded-lg py-10 h-max md:sticky md:top-30'>
      <p className='text-lg font-semibold px-6'>Available Timings</p>
      <div className='mt-5 space-y-1'>
        {show.dateTime[date].map((item)=>(
          <div key={item.time} onClick={()=> setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time ===item.time ? "bg-red-400 text-white" : "hover:bg-red-400 /20"}`}>
            <ClockIcon className='w-4 h-4'/>
            <p className='text-sm'>{isoTimeFormat(item.time)}</p>

          </div>
        ))}
      </div>
      </div>
      {/* seat layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' left='-100px'/>
        <BlurCircle bottom='0' left='0'/>
        <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
        <img src={assets.screenImage} alt="" />
        <p className='text-gray-400 text-sm mb-6'>Screen Side</p>
<div>
  {groupRows[0].map(row => renderSeats(row))}
  </div>
      </div>
    </div>
  ) :
  (
    <h1>Loading</h1>
  )
}

export default SeatLayout

