import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalData: {
    type: undefined,
    title: undefined,
    message: undefined,
    open: false,
    others: {},
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modalData = { ...action.payload };
    },
  },
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
