import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/admin/title';
import { CheckIcon, StarIcon } from 'lucide-react';
import { kconverter } from '../../lib/kconverter';
const AddShows = () => {
  const currency=import.meta.VITE_CURRENCY
  const [nowPlayingMovies, setNowPlayingMovies]=useState([]);
  const [selectedMovie,setSelectedMovie]=useState(null);
  const [dateTimeSelection,setDateTimeSelection]=useState({});

  const [dateTimeInput,setdateTimeInput]=useState("");
  const [showPrice,setshowPrice]=useState("");

  const fetchNowplayingmovie =async () =>{
    setNowPlayingMovies(dummyShowsData)
  };
  const handleDateTimeAdd  = () => {
    if(!dateTimeInput) return;
    const [date,time]=dateTimeInput.split("T");
    if(!date || !time) return;
    setDateTimeSelection((prev)=>{
      const times=prev[date] || [];
      if(!times.includes(time)) {
        return {...prev,[date] :[...times,time]}
      };
      return prev;
    });
  };
  const handleRemoveTime =(date,time) =>{
    setDateTimeSelection((prev) => {
      const filteredTimes= prev [date].filter((t) => t!==time);
      if(filteredTimes.length ===0) {
        const {[date]: _, ...rest} =prev;
        return rest;
      }
      return {
        ...prev,
        [date]:filteredTimes,

      };
    });
  };
  useEffect (() =>{
    fetchNowplayingmovie();
  },[])


  
  return nowPlayingMovies.length >0 ? (
    <>
      <Title text1="Add" text2="Shows"/>
      <p className='mt-10 text-lg font-medium'>Now Playing Movies</p>
      <div className='overflow-x auto-pb-4'>
        <div className='group flex flex-wrap gap-4 w-max mt-4'>
        {nowPlayingMovies.map((movie) =>(
          <div key={movie.id} className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`} onClick={() =>setSelectedMovie(movie.id)}>
            <div className='relative rounded-lg overflow-hidden'> 
              <img src={movie.poster_path} alt="" className='w-full object-cover brightness-90'/>
              <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
              <p className='flex items-center gap-1 text-gray-400'>
                <StarIcon className="w-4 h-4 text-red-400 fill-red-400"/>
                {movie.vote_average.toFixed(1)}
                </p>
                <p className='text-gray-300'>{kconverter(movie.vote_count)} Votes</p>
                </div>
              </div>
              {selectedMovie ===movie.id && (
                <div className='absolute top-2 right-2 flex items-center justify-center bg-red-500 h-6 w-6 rounded'>
                  <CheckIcon className='w-4 h-4 text-white'strokeWidth={2.5}/>
                  </div>

              )}
              <p className='font-medium truncate'>{movie.title}</p>
              <p className='text-gray-400 text-sm'>{movie.release_date}</p>

            </div>
        ))}
        </div>
      </div>
      {/* show price input*/}
      <div className='mt-8'>
        <label className='block text-sm font-medium mb-2'>Show Price</label>
        <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
          <p className='text-gray-400 text-sm'>{currency}</p>
          <input min={0} type="number" value={showPrice} onChange={(e) => setshowPrice(e.target.value)} placeholder='"Enter show price' className='outline-none'/>

        </div>
      </div>
            {/* Date time selection */}
            <div className='mt-6'>
              <label className='block text-sm font-medium mb-2'>Select Date and Time</label>
              <div className='inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg'>
                <input type='datetime-local' value={dateTimeInput} onChange={(e) => setdateTimeInput(e.target.value)} className='outline-none rounded-md'/>
                <button onClick={handleDateTimeAdd} className='bg-red-400/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-red-400 cursor-pointer'>Add Time</button>

              </div>


            </div>
    </>
  ) : <p>Loading</p>
}

export default AddShows
