import { createSlice } from "@reduxjs/toolkit";

export const defaultSlice = createSlice({
  name: "default",
  initialState: {
    img: "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    type: "image",
    video: "",
  },
  reducers: {
    setImg: (state, action) => {
      console.log(action);
      state.img = action.payload;
    },
    setType: (state, action) => {
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
