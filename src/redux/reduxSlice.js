// reduxSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBlurred: false,
};

const blurSlice = createSlice({
  name: "blur",
  initialState,
  reducers: {
    setBlurred(state, action) {
      state.isBlurred = action.payload;
    },
  },
});

export const { setBlurred } = blurSlice.actions;
export default blurSlice.reducer;
