import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    setMovies: (state, action) => {
      console.log(state, state.movies, action.payload)
      return state.movies.push(action.payload)
    }
  }
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;