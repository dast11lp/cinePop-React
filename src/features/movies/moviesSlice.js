import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "../../services/moviesService";

const initialState = {
  listingMovies: [],
  currentPage: 0,
  hasMore: true,
};

const moviesSlice = createSlice({
  name: "listingMovies",
  initialState,
  reducers: {
    appendMovies: (state, action) => {
      state.listingMovies = [...state.listingMovies, ...action.payload.content];
      state.currentPage += 1;
      state.hasMore = !action.payload.last;
    },
    cleanMovies: (state) => {
      state.listingMovies = [];
      state.currentPage = 0;
      state.hasMore = true;
    },
  },
});

export const getMoviesMiddleware = (page) => async (dispatch) => {
  try {
    const data = await fetchMovies(page);
    dispatch(appendMovies(data));
  } catch (error) {
    throw error;
  }
};

export const { appendMovies, cleanMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
