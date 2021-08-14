import { createSlice } from "@reduxjs/toolkit";

export const defaultSlice = createSlice({
  name: "default",
  initialState: {
    img: "",
    type: "image",
    video: "",
  },
  reducers: {
    setImg: (state, action) => {
      console.log(action, "is action");
      state.img = action.payload;
    },
    setType: (state, action) => {
      console.log("set type");
      state.type = action.payload;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },
  },
});

// 每一个 reducer 函数都会生成一个对应的 action
export const { setImg, setType, setVideo } = defaultSlice.actions;
export default defaultSlice.reducer;
