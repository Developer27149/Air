import { createSlice } from "@reduxjs/toolkit";

export const dragSlice = createSlice({
  name: "dragEvent",
  initialState: {
    posArr: [],
  },
  reducers: {
    setDragPosArr(state, action) {
      state.posArr = action.payload;
    },
  },
});

export const { setDragPosArr } = dragSlice.actions;
export default dragSlice.reducer;
