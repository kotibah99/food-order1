import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: { menuList: [] },

  reducers: {
    replaceMenuList(state, action) {
      state.menuList = action.payload;
    },
  },
});

export const MenuActions = menuSlice.actions;
export const MenuReducer = menuSlice.reducer;
