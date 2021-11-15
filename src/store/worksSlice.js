// export your slice / reducer / actions

import { createSlice } from "@reduxjs/toolkit";

export const worksSlice = createSlice({
  name: "works",
  initialState: {
    activeMenu: true,
    activeMenuItemId: 1,
  },
  reducers: {
    setActiveMenu(state) {
      console.log("revert statu");
      state.activeMenu = !state.activeMenu;
    },
    setActiveMenuItemId(state, action) {
      state.activeMenuItemId = action.payload;
    },
  },
});

export const { setActiveMenu, setActiveMenuItemId } = worksSlice.actions;
export default worksSlice.reducer;
