import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { options } from "../utils/constant";

const usePopularMovies = () => {

    const dispatch = useDispatch();
  
    const getPopularMovie = async() => {
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?&page=1', options)
      const json = await data.json();
      // console.log(json.results)
      dispatch(addPopularMovies(json.results))
    }
  
    useEffect(() => {
      getPopularMovie();
    },[])
}


export default usePopularMovies;