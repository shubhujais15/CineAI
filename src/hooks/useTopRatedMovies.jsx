import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { options } from "../utils/constant";

const useTopRatedMovies = () => {

    const dispatch = useDispatch();
  
    const getTopRatedMovie = async() => {
      const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      const json = await data.json();
      // console.log(json.results)
      dispatch(addTopRatedMovies(json.results))
    }
  
    useEffect(() => {
      getTopRatedMovie();
    },[])
}


export default useTopRatedMovies;