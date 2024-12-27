import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import genAI from '../utils/genAI';
import { options } from '../utils/constant';
import { addGptMovieResult } from '../utils/gptSlice';

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        'https://api.themoviedb.org/3/search/movie?query=' +
          movie +
          '&include_adult=false&language=en-US&page=1',
        options
      );
      const json = await data.json();
      return json.results;
    } catch (error) {
      console.error('Error fetching from TMDB:', error);
      return [];
    }
  };

  const handleGPTSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma-separated like the example given ahead. Example Result: Sholay, Dhol, Golmal, Krrish, Hera Pheri";

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const gptResults = await model.generateContent(gptQuery);

      // Log the response to debug its structure
      console.log('Gemini API Response:', gptResults.response);

      // Invoke the text function to get the content
      const responseText = gptResults.response?.text();
      if (!responseText || typeof responseText !== 'string') {
        throw new Error('Invalid response format from Gemini AI');
      }

      const gptMovies = responseText.split(',').map((movie) => movie.trim());

      // For each movie, search TMDB API
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
    } catch (error) {
      console.error('Error fetching results from Gemini AI:', error);
    }
  };

  return (
    <div className="pt-[42%] md:pt-[10%] flex justify-center">
      <form
        action="GptSearch"
        className="w-full md:w-1/2 bg-black rounded-lg grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-3 m-4 col-span-9 rounded-md"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />

        <button
          className="p-2 m-4 bg-red-700 rounded-lg text-white col-span-3 hover:bg-opacity-80 active:scale-95"
          onClick={handleGPTSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
