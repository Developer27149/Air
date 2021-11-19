// export your slice / reducer / actions

import { createSlice } from "@reduxjs/toolkit";
import getInitConfig from "Utils/getInitState.js";

const config = await getInitConfig();
const todo = config.todo;

export const worksSlice = createSlice({
  name: "works",
  initialState: {
    activeMenu: todo.activeMenu,
    activeMenuItemId: todo.activeMenuItemId,
    tasks: todo.tasks,
    showTip: todo.showTip,
  },
  reducers: {
    setActiveMenu(state, action) {
      state.activeMenu = action.payload;
      globalThis.settings.todo = { ...state };
    },
    setActiveMenuItemId(state, action) {
      state.activeMenuItemId = action.payload;
      globalThis.settings.todo = { ...state };
    },
    setTasks(state, action) {
      state.tasks = action.payload;
      globalThis.settings.todo = { ...state };
    },
    hiddenTip(state) {
      state.showTip = false;
      globalThis.settings.todo = { ...state };
    },
  },
});

export const { setActiveMenu, setActiveMenuItemId, setTasks, hiddenTip } = worksSlice.actions;
export default worksSlice.reducer;
