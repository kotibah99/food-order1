import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: { addressList: [] },

  reducers: {
    replaceAddressList(state, action) {
      state.addressList = action.payload;
    },
    clearAddressList(state) {
      state.addressList = [];
    },
    addAddressToList(state, action) {
      state.addressList.unshift(action.payload);
    },
    removeAddressFromList(state, action) {
      const addressId = action.payload;
      state.addressList = state.addressList.filter(
        address => address.id !== addressId
      );
    },
  },
});

export const AddressActions = addressSlice.actions;
export const AddressReducer = addressSlice.reducer;
