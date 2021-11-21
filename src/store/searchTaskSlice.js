import { createSlice } from "@reduxjs/toolkit";

const searchTaskSlice = createSlice({
  name: "searchTask",
  initialState: {
    keyword: "",
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
  },
});

export const { setKeyword } = searchTaskSlice.actions;
export default searchTaskSlice.reducer;
