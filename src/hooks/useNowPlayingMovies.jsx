import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { options } from "../utils/constant";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);
  
    const getNowPlayingMovie = async() => {
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      const json = await data.json();
      // console.log(json.results)
      dispatch(addNowPlayingMovies(json.results))
    }
  
    useEffect(() => {
      !nowPlayingMovies && getNowPlayingMovie();
    },[])
}


export default useNowPlayingMovies;