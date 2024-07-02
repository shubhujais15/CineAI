import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { options } from '../utils/constant'
import { addGptMovieResult } from '../utils/gptSlice'

const GPTSearchBar = () => {
  const dispatch = useDispatch();

    const langKey = useSelector((store) => store.config.lang)

    const searchText = useRef(null);

    //search movie in TMDB
    const searchMovieTMDB = async(movie) => {
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query='
        + movie +
        '&include_adult=false&language=en-US&page=1', options);
        const json = await data.json();
        return json.results;
    }

    const handleGPTSearchClick = async() => {
      console.log(searchText.current.value);
      //Make an APi call to GPT Api and get movie result

    const gptQuery = "Act as a movie recommendation system and suggest some movies for the query: "
    + searchText.current.value +
    ".only give me names of 5 movies , comma seperated like the example given ahead. Example Result: Sholay, Dhol, Golmal, Krrish, Hera Pheri" 

    const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      if(!gptResults){
        return <h3>Error:NOT Found 404</h3>
      }

      console.log(gptResults.choices?.[0]?.message?.content)
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");   //Gives array of movies

      //For each movie will search TMDB api
      const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));   //get array of promises
      const tmdbResults = await Promise.all(promiseArray);
      dispatch(addGptMovieResult({movieNames: gptMovies,movieResults: tmdbResults}));
    }

  return (
    <div className='pt-[42%] md:pt-[10%] flex justify-center'>
        <form action="GptSearch" className='w-full md:w-1/2 bg-black rounded-lg grid grid-cols-12'
        onSubmit={(e) => e.preventDefault()}>

            <input ref={searchText}
            type="text" className='p-3 m-4 col-span-9 rounded-md' placeholder={lang[langKey].gptSearchPlaceholder} />

            <button className='p-2 m-4 bg-red-700 rounded-lg text-white col-span-3 hover:bg-opacity-80 active:scale-95'
             onClick={handleGPTSearchClick}>
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GPTSearchBar;