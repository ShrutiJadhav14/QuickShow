import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/admin/title';
import { dateFormat } from '../../lib/DateFormat';
const ListShows = () => {
  const currency =import.meta.env.VITE_CURRENCY
  const [shows,setShows]=useState([]);
  const [loading,setLoading]= useState(true);
  const getAllShows =async () => {
try {
  setShows([{
    movie :dummyShowsData[0],
    showDateTime :"2025-06-30T02:30:00.000Z",
    showPrice :59,
    occupiedSeats :{
      A1 : "user_1",
      B1 : "user_2",
      C1 : "user_3"
    }
  }]);
  setLoading(false);

}
catch(error){
  console.error();
}
  }
  useEffect (()=> {
    getAllShows();
  }, []);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows"/>
      <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
        <thead>
          <tr className='bg-red-400/20 text-left text-white'>
          <th className='p-2 font-medium pl-5'> Movie Name</th>
          <th className='p-2 font-medium pl-5'>Show Time</th>
         <th className='p-2 font-medium pl-5'>Total Bookings</th>
          <th className='p-2 font-medium pl-5'>Earnings</th>

          </tr>
        </thead>
        <tbody className='text-sm font-light'>
          {shows.map((show,index) => (
            <tr key={index} className='border-b border-red-400/10 bg-red-500/5 even:bg-red-500/10'>
              <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
              <td className='p-2'>{dateFormat(show.showDateTime)}</td>
              <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
              <td className='p-2'>{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </>
  ) : <p>Loading</p>
}

export default ListShows
