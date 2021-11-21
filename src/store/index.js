import { configureStore } from "@reduxjs/toolkit";
import basicReducer from "./basicSlice.js";
import homeReducer from "./homeSlice";
import profileReducer from "./profile.js";
import wallpaperReducer from "./wallpaperSlice.js";
import worksReducer from "./worksSlice.js";
import dragEventReducer from "./dragSlice.js";
import searchTaskReducer from "./searchTaskSlice.js";

export default configureStore({
  reducer: {
    home: homeReducer,
    basic: basicReducer,
    profile: profileReducer,
    wallpaper: wallpaperReducer,
    works: worksReducer,
    dragEvent: dragEventReducer,
    searchTask: searchTaskReducer,
  },
});
