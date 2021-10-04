import { createSlice } from "@reduxjs/toolkit";
import getInitConfig from "Utils/getInitState.js";

const { profile } = await getInitConfig();
export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
      globalThis.settings.profile = action.payload;
    },
  },
});

// 每一个 reducer 函数都会生成一个对应的 action
export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
