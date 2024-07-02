import React from 'react'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import { useSelector } from 'react-redux';
// import {nowPlayingMovies} from "../utils/moviesSlice"

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

    if(!movies && movies === null) return;

    const mainMovie = movies[1];
    // console.log(mainMovie);

    const {original_title, overview, id} = mainMovie;

  return (
    <div className='pt-[32%] bg-black md:pt-3'>
        <VideoTitle title={original_title} overview={overview} />
        <VideoBackground movId={id} />
    </div>
  )
}

export default MainContainer;