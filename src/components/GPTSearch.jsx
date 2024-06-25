import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestion from './GPTMovieSuggestion'
// import { BACK_PIC } from '../utils/constant'

const GPTSearch = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 h-full w-full -z-30">
        <img
          src="https://wallpaper.dog/large/20493433.jpg"
          alt="background-img"
          className="object-cover h-full w-full"
        />
      </div>
        <GPTSearchBar />
        <GPTMovieSuggestion />
    </div>
  )
}

export default GPTSearch