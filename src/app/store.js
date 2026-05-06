import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import movies from "../features/movies/moviesSlice";
import screenings from "../features/screenings/screeningsSlice";
import booking from "../features/booking/bookingSlice";
import modal from "../features/ui/modalSlice";
import previousPath from "../features/ui/previousPathSlice";

export const store = configureStore({
  reducer: {
    auth,
    movies,
    screenings,
    booking,
    modal,
    previousPath,
  },
});
