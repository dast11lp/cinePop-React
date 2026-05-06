import { createSlice } from "@reduxjs/toolkit";
import { fetchScreeningsByMovie } from "../../services/screeningsService";

const initialState = {
  movieFunction: {},
  functionPerDate: {},
  chairs: [],
};

const screeningsSlice = createSlice({
  name: "listFunctionsPerMovie",
  initialState,
  reducers: {
    getListFuncPerMovie: (state, action) => {
      state.movieFunction = action.payload;
      const map = new Map();

      state.movieFunction.functionMovie.forEach((el) => {
        if (!map.has(el.function.date)) {
          map.set(el.function.date, []);
        }
        map.get(el.function.date).push(el);
      });

      state.functionPerDate = Object.fromEntries(map);
    },

    cleanListFuncPerMovie: (state) => {
      state.movieFunction = [];
    },
  },
});

export const getFuncMovieMiddleware = (id) => async (dispatch) => {
  try {
    const data = await fetchScreeningsByMovie(id);
    dispatch(getListFuncPerMovie(data));
  } catch (error) {
    throw error;
  }
};

export const { getListFuncPerMovie, cleanListFuncPerMovie } =
  screeningsSlice.actions;

export default screeningsSlice.reducer;
