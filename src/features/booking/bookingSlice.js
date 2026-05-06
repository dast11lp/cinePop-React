import { createSlice } from "@reduxjs/toolkit";
import { fetchScreening } from "../../services/screeningsService";
import {
  fetchChairs,
  createReservation,
  fetchReservationIds,
  fetchReservation,
  fetchReservationsByPage,
} from "../../services/bookingService";

const initialState = {
  function_: {},
  desiredTickets: 0,
  totalMount: 0,
  availableTickets: 0,
  numselectedIdSeats: 0,
  selectedIdSeats: [],
  selectedSeats: [],
  purchaseSummary: {},
  reservationDetails: {
    functionChairs: [],
    idFunMov: undefined,
  },
  chairs: [],
  idReservations: [],
  reservations: {},
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setFunction_: (state, action) => {
      state.function_ = action.payload;
      state.reservationDetails.idFunMov =
        action.payload.listFunctionMovie[0].id;
    },
    addSeat: (state) => {
      if (state.availableTickets > state.desiredTickets) {
        state.desiredTickets += 1;
        state.totalMount = state.function_.priceTicket * state.desiredTickets;
      }
    },
    subtractSeat: (state) => {
      if (state.desiredTickets > 0) {
        state.desiredTickets -= 1;
        state.totalMount = state.function_.priceTicket * state.desiredTickets;
      }
    },
    getAvailableTickets: (state) => {
      state.availableTickets = state.function_.functionChairs.filter(
        (el) => el.available == true
      ).length;
    },
    cleardesiredTickets: (state) => {
      state.desiredTickets = 0;
      state.totalMount = 0;
    },
    clearSlice: (state) => {
      (state.function_ = {}),
        (state.availableTickets = 0),
        (state.selectedIdSeats = []),
        (state.selectedSeats = []),
        (state.purchaseSummary = {}),
        (state.reservationDetails = {
          functionChairs: [],
          idFunMov: undefined,
        });
    },
    setDesiredSeats: (state, action) => {
      state.numselectedIdSeats = action.payload;
    },
    setIdSeats: (state, action) => {
      if (state.numselectedIdSeats > 0) {
        state.numselectedIdSeats -= 1;
        state.reservationDetails.functionChairs.push(action.payload.idSeat);
        state.selectedIdSeats.push(action.payload.idSeat);
        state.selectedSeats.push(action.payload.numSeat);
      } else {
        console.log("te jodiste hermano");
      }
    },
    removeIdSeats: (state, action) => {
      if (state.numselectedIdSeats >= 0) {
        state.numselectedIdSeats += 1;
        state.reservationDetails.functionChairs =
          state.reservationDetails.functionChairs.filter(
            (el) => el != action.payload.idSeat
          );
        state.selectedIdSeats = state.selectedIdSeats.filter(
          (el) => el != action.payload.idSeat
        );
        state.selectedSeats = state.selectedSeats.filter(
          (el) => el != action.payload.numSeat
        );
      }
    },
    setPurchaseSummary: (state, action) => {
      state.purchaseSummary = action.payload;
    },
    getChairs: (state, action) => {
      state.chairs = action.payload;
    },
    setIdReservations: (state, action) => {
      state.idReservations = action.payload;
    },
    setReservation: (state, action) => {
      state.reservations = action.payload;
    },
  },
});

export const functionFetchMiddleware = (id) => async (dispatch) => {
  try {
    const data = await fetchScreening(id);
    dispatch(setFunction_(data));
    dispatch(getAvailableTickets());
  } catch (error) {
    throw error;
  }
};

export const reserveFetchMiddleware =
  ({ reservationDetails }) =>
  async (dispatch) => {
    try {
      const data = await createReservation(reservationDetails);
      dispatch(setPurchaseSummary(data));
    } catch (error) {
      throw error;
    }
  };

export const getChairsMiddleware = (id) => async (dispatch) => {
  try {
    const data = await fetchChairs(id);
    dispatch(getChairs(data));
  } catch (error) {
    console.error(error);
  }
};

export const getReservationIdsMiddleware = (idUser) => async (dispatch) => {
  try {
    const data = await fetchReservationIds(idUser);
    dispatch(setIdReservations(data));
  } catch (error) {}
};

export const getUniqueReservationMiddleware =
  (idUser, idReserve) => async (dispatch) => {
    const data = await fetchReservation(idUser, idReserve);
    dispatch(setReservation(data));
  };

export const getReservationByPagesMiddleware =
  (page, userId) => async (dispatch) => {
    const data = await fetchReservationsByPage(page, userId);
    dispatch(setReservation(data));
  };

export const {
  setFunction_,
  addSeat,
  subtractSeat,
  getAvailableTickets,
  cleardesiredTickets,
  clearSlice,
  setDesiredSeats,
  setIdSeats,
  removeIdSeats,
  setPurchaseSummary,
  getChairs,
  setIdReservations,
  setReservation,
} = bookingSlice.actions;

export default bookingSlice.reducer;
