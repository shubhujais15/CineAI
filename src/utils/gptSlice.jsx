import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState:{
        gptSearchView: false,
        movieNames: null,
        movieResults: null,
    },
    reducers: {
        toggleGptSearchView : (state) => {
            state.gptSearchView = !state.gptSearchView;
        },
        addGptMovieResult: (state,action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        }
    }
})

export const {toggleGptSearchView, addGptMovieResult} = gptSlice.actions;

export default gptSlice.reducer;