import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies"
import userDataReducer from "./reducers/userData"

export const store = configureStore({
  reducer: { movies: moviesReducer, userData: userDataReducer}
});