import { createSlice } from "@reduxjs/toolkit";
import getInitConfig from "Utils/getInitState.js";
import { unflatArr } from "Utils/index.js";

const { wallpaper } = await getInitConfig();

export const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState: {
    // 默认设置初始显示的壁纸数为 15 张
    wallpaperArr: unflatArr([...wallpaper.items]),
    curPage: 1,
    startPage: 1,
  },
  reducers: {
    setWallpaperArr(state, action) {
      state.wallpaperArr = action.payload;
    },
    setCurPage(state, action) {
      state.curPage = action.payload;
    },
    setStartPage(state, action) {
      state.startPage = action.payload;
    },
  },
});

// 每一个 reducer 函数都会生成一个对应的 action
export const { setWallpaperArr, setCurPage, setStartPage } = wallpaperSlice.actions;
export default wallpaperSlice.reducer;
