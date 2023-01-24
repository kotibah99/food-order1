import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: { favoriteList: [] },

  reducers: {
    addToFavorite(state, action) {
      state.favoriteList.unshift(action.payload);
    },
    removeFromFavorite(state, action) {
      const { id } = action.payload;
      state.favoriteList = state.favoriteList.filter(item => item.id !== id);
    },
    clearFavoriteList(state) {
      state.favoriteList = [];
    },
  },
});

export const FavoriteActions = favoriteSlice.actions;
export const FavoriteReducer = favoriteSlice.reducer;
