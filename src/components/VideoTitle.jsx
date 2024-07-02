import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='my-5 md:my-0 pt-[18%] px-6 md:px-20 absolute text-white bg-gradient-to-r from-black w-screen aspect-video'>
      <h1 className='text-3xl font-bold md:text-3xl'>{title}</h1>
      <p className='hidden md:inline-block w-1/4 text-lg py-6'>{overview}</p>
      <div>
        <button className='my-3 md:my-0 rounded-lg bg-white text-black py-2 md:py-3 px-6 md:px-8 hover:bg-opacity-85 active:scale-90'>▶️ Play</button>
        <button className='hidden md:inline-block rounded-lg bg-gray-500 text-white p-3 px-8 ml-3 bg-opacity-50 active:scale-90'>ℹ️ More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle;