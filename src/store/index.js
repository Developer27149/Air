import { configureStore } from "@reduxjs/toolkit";
import basicReducer from "./basicSlice.js";
import homeReducer from "./homeSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
    basic: basicReducer,
  },
});
