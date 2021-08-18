import { createSlice } from "@reduxjs/toolkit";

export const defaultSlice = createSlice({
  name: "default",
  initialState: {
    newImg: "",
    img: "",
    type: "image",
    video: "",
    searchEngine: "google.com",
    fixedImg: "",
    showTime: true,
  },
  reducers: {
    setImg: (state, action) => {
      console.log(action, "is action");
      state.img = action.payload;
    },
    setNewImg: (state, action) => {
      console.log(action, "is action");
      state.newImg = action.payload;
    },
    setType: (state, action) => {
      console.log("set type");
      state.type = action.payload;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setSearchEngine(state, action) {
      state.searchEngine = action.payload;
      globalThis.config.searchEngine = action.payload;
    },
    setFixedImg(state, action) {
      state.fixedImg = action.payload === state.fixedImg ? "" : action.payload;
      globalThis.config.fixedImg = action.payload;
    },
    setShowTime(state, action) {
      state.showTime = action.payload;
      globalThis.config.showTime = action.payload;
    },
  },
});

// 每一个 reducer 函数都会生成一个对应的 action
export const { setImg, setNewImg, setType, setVideo, setSearchEngine } = defaultSlice.actions;
export default defaultSlice.reducer;
