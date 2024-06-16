import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { options } from "../utils/constant";

const useUpcomingMovies = () => {

    const dispatch = useDispatch();
  
    const getUpcomingMovie = async() => {
      const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      const json = await data.json();
      // console.log(json.results)
      dispatch(addUpcomingMovies(json.results))
    }
  
    useEffect(() => {
      getUpcomingMovie();
    },[])
}


export default useUpcomingMovies;