import { createSlice } from "@reduxjs/toolkit";
import getInitConfig from "Utils/getInitState.js";

const { time, msg, backendBaseUrl, updateTimestamp, token } = await getInitConfig();
export const basicSlice = createSlice({
  name: "basic",
  initialState: {
    time,
    msg,
    backendBaseUrl,
    updateTimestamp,
    token,
  },
  reducers: {
    setTime(state, action) {
      state.time = action.payload;
      globalThis.settings = {
        ...globalThis.settings,
        time: action.payload,
      };
    },
    setMsg(state, action) {
      state.msg = action.payload;
      globalThis.settings = {
        ...globalThis.settings,
        msg: action.payload,
      };
    },
    setBackendBaseUrl(state, action) {
      state.backendBaseUrl = action.payload;
      globalThis.settings = {
        ...globalThis.settings,
        backendBaseUrl: action.payload,
      };
    },
    setUpdateTimestamp(state, action) {
      state.updateTimestamp = action.payload;
      globalThis.settings = {
        ...globalThis.settings,
        updateTimestamp: action.payload,
      };
    },
    setToken(state, action) {
      state.token = action.payload;
      globalThis.settings = {
        ...globalThis.settings,
        token: action.payload,
      };
    },
  },
});

// 每一个 reducer 函数都会生成一个对应的 action
export const { setBackendBaseUrl, setToken, setTime, setUpdateTimestamp, setMsg } =
  basicSlice.actions;
export default basicSlice.reducer;
