// store.js
import { configureStore } from "@reduxjs/toolkit";
import blurReducer from "./redux/reduxSlice";

export const store = configureStore({
  reducer: {
    blur: blurReducer,
  },
});

export default store;
