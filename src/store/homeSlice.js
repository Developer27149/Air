import { createSlice, current } from "@reduxjs/toolkit";
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
    updateWallpaperItems(state, action) {
      const currentState = current(state);
      const idArr = currentState.wallpaper.items.map((i) => i.id);
      const items = [];
      action.payload.forEach((item) => {
        if (!idArr.includes(item.id)) {
          items.push(item);
        }
      });
      const nextWallpaper = {
        ...currentState.wallpaper,
        items: items.concat(currentState.wallpaper.items),
      };
      state.wallpaper = nextWallpaper;
      globalThis.settings.wallpaper = nextWallpaper;
    },
  },
});

// 每一个 reducer 函数都会生成一个对应的 action
export const { setSearch, setWallpaper, setWeather, updateWallpaperItems } = homeSlice.actions;
export default homeSlice.reducer;
