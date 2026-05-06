import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previousPage: "",
};

const previousPathSlice = createSlice({
  name: "previousPath",
  initialState,
  reducers: {
    setPreviousPage: (state, action) => {
      if (action.payload != undefined) {
        state.previousPage = action.payload;
      }
    },
  },
});

export const { setPreviousPage } = previousPathSlice.actions;
export default previousPathSlice.reducer;
