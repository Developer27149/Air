import { createSlice } from "@reduxjs/toolkit";
// import { config } from "../prepare/init";

// const settings = globalThis.settings || config;
export const basicSlice = createSlice({
  name: "basic",
  initialState: {
    location: "",
    time: globalThis?.settings?.time || {},
    msg: globalThis?.settings?.search || {},
    backendBaseUrl: globalThis?.settings?.backendBaseUrl || {},
    updateTimestamp: globalThis?.settings?.updateTimestamp || "",
    token: globalThis?.settings?.token || "",
  },
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
      globalThis.settings = {
        ...globalThis.settings,
        location: action.payload,
      };
    },
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
export const { setBackendBaseUrl, setToken, setTime, setLocation, setUpdateTimestamp, setMsg } =
  basicSlice.actions;
export default basicSlice.reducer;
