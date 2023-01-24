import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { orders: [] },

  reducers: {
    replaceOrders(state, action) {
      state.orders = action.payload;
    },
    clearOrders(state) {
      state.orders = [];
    },
    addNewOrder(state, action) {
      const order = action.payload;
      state.orders.unshift(order);
    },
    modifyOrderState(state, action) {
      const orderId = action.payload;
      const targetOrder = state.orders.find(order => order.id === orderId);
      targetOrder.orderStatus = 5;
    },
  },
});

export const OrdersActions = ordersSlice.actions;
export const OrdersReducer = ordersSlice.reducer;
