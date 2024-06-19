import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-[18%] px-20 absolute text-white bg-gradient-to-r from-black w-screen aspect-video'>
      <h1 className='font-bold text-3xl'>{title}</h1>
      <p className='w-1/4 text-lg py-6'>{overview}</p>
      <div>
        <button className='rounded-lg bg-white text-black p-3 px-8 hover:bg-opacity-85 active:scale-90'>▶️ Play</button>
        <button className='rounded-lg bg-gray-500 text-white p-3 px-8 ml-3 bg-opacity-50 active:scale-90'>ℹ️ More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle;