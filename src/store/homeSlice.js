import { createSlice } from "@reduxjs/toolkit";
import getInitConfig from "Utils/getInitState.js";

const { wallpaper, search } = await getInitConfig();

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    newImg: "",
    wallpaper,
    search,
  },
  reducers: {
    setNewImg(state, action) {
      state.newImg = action.payload;
    },
    setWallpaper(state, action) {
      state.wallpaper = action.payload;
      globalThis.settings = {
        ...globalThis.settings,
        wallpaper: action.payload,
      };
    },
    setSearch(state, action) {
      state.search = action.payload;
      globalThis.settings = {
        ...globalThis.settings,
        search: action.payload,
      };
    },
  },
});

// 每一个 reducer 函数都会生成一个对应的 action
export const { setNewImg, setSearch, setWallpaper } = homeSlice.actions;
export default homeSlice.reducer;
