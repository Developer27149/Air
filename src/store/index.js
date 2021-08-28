import { configureStore } from "@reduxjs/toolkit";
import basicSlice from "./basicSlice.js";
import homeReducer from "./homeSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
    basic: basicSlice,
  },
});
