import React from 'react'

const title = ({text1,text2}) => {
  return (
 <h1>
    {text1} <span className='underline text-red-400'>{text2}</span>
    </h1>
  )
}

export default title

