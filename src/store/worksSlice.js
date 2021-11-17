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
      console.log("revert statu");
      state.activeMenu = action.payload;
      globalThis.settings.todo.activeMenu = action.payload;
    },
    setActiveMenuItemId(state, action) {
      state.activeMenuItemId = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
      globalThis.settings.todo.tasks = action.payload;
    },
    hiddenTip(state) {
      state.showTip = false;
      globalThis.settings.todo.showTip = false;
    },
  },
});

export const { setActiveMenu, setActiveMenuItemId } = worksSlice.actions;
export default worksSlice.reducer;
