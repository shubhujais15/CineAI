import { useDispatch } from "react-redux";
import { options } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movId) => {
  const dispatch = useDispatch()
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"+ movId +"/videos?language=en-US",
      options
    );
    const json = await data.json();
    // console.log(json);
    const filterTrailer = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterTrailer.length ? filterTrailer[0] : json.results[0];
    // console.log(trailer);
    dispatch(addTrailerVideo(trailer))
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
}

export default useMovieTrailer;