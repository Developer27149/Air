import { createSlice } from "@reduxjs/toolkit";
import getInitConfig from "Utils/getInitState.js";

const { wallpaper, search, weather } = await getInitConfig();
export const homeSlice = createSlice({
  name: "home",
  initialState: {
    wallpaper,
    search,
    weather,
  },
  reducers: {
    setWallpaper(state, action) {
      state.wallpaper = action.payload;
      globalThis.settings.wallpaper = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
      globalThis.settings.search = action.payload;
    },
    setWeather(state, action) {
      console.log(action);
      state.weather = action.payload;
      globalThis.settings.weather = action.payload;
    },
  },
});

// 每一个 reducer 函数都会生成一个对应的 action
export const { setSearch, setWallpaper, setWeather } = homeSlice.actions;
export default homeSlice.reducer;
