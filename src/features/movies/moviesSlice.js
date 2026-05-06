import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "../../services/moviesService";

const initialState = {
  listingMovies: [],
};

const moviesSlice = createSlice({
  name: "listingMovies",
  initialState,
  reducers: {
    getMovies: (state, action) => {
      state.listingMovies = action.payload;
    },
    cleanMovies: (state) => {
      state.listingMovies = [];
    },
  },
});

export const getMoviesMiddleware = () => async (dispatch) => {
  try {
    const data = await fetchMovies();
    dispatch(getMovies(data));
  } catch (error) {
    throw error;
  }
};

export const { getMovies, cleanMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
