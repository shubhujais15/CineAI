import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movId }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo)
  useMovieTrailer(movId);

  return (
    <div className="w-screen">
   <iframe
  className="w-screen aspect-video"
  src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&rel=0&loop=1&playlist=${trailerVideo?.key}&modestbranding=1&controls=0&showinfo=0&iv_load_policy=3`}
  title="YouTube video player"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
  referrerPolicy="strict-origin-when-cross-origin"
></iframe>



    </div>
  );
};

export default VideoBackground;
