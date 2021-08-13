import { configureStore } from "@reduxjs/toolkit";
import defaultReducer from "./defaultSlice";

export default configureStore({
  reducer: {
    default: defaultReducer,
  },
});
