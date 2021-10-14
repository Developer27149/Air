import { configureStore } from "@reduxjs/toolkit";
import basicReducer from "./basicSlice.js";
import homeReducer from "./homeSlice";
import profileReducer from "./profile.js";
import wallpaperReducer from "./wallpaperSlice.js";

export default configureStore({
  reducer: {
    home: homeReducer,
    basic: basicReducer,
    profile: profileReducer,
    wallpaper: wallpaperReducer,
  },
});
