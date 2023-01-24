import { createSlice } from '@reduxjs/toolkit';

import { SIZE_PRICE_MAPPER } from '../data/constants';
import { DISCOUNT_CALCULATOR } from '../utils/helpers';

const initialCartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,

  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const exitingItem = state.items.find(
        item => item.productId === newItem.productId
      );

      let amount;
      if (!exitingItem) {
        amount = +newItem.amount;
        state.items.unshift(newItem);
      } else {
        if (exitingItem.quantity + newItem.quantity > 15) return;

        exitingItem.size = newItem.size;
        exitingItem.price = newItem.price;
        exitingItem.taste = newItem.taste;
        exitingItem.drinkId = newItem.drinkId;
        exitingItem.createOn = newItem.createOn;
        exitingItem.quantity += newItem.quantity;
        amount = exitingItem.quantity * newItem.price - exitingItem.amount;
        exitingItem.amount = exitingItem.quantity * newItem.price;
      }
      state.totalAmount += amount;
      state.totalQuantity += newItem.quantity;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const exitingItem = state.items.find(item => item.productId === id);
      if (exitingItem.quantity === 1) {
        state.items = state.items.filter(item => item.productId !== id);
      } else {
        exitingItem.quantity--;
        exitingItem.amount -= exitingItem.price;
      }
      state.totalQuantity--;
      state.totalAmount -= exitingItem.price;
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    replaceCartItems(state, action) {
      const cartItems = action.payload;

      const items = cartItems.map(item => {
        const itemPrice = item.product[SIZE_PRICE_MAPPER[item.size]];
        const price = DISCOUNT_CALCULATOR(
          itemPrice,
          item.product.discountValue
        );

        return {
          price,
          size: item.size,
          taste: item.taste,
          drinkId: item.drinkId,
          createOn: item.createOn,
          quantity: item.quantity,
          title: item.product.title,
          productId: item.productId,
          image: item.product.image,
          amount: item.quantity * price,
        };
      });

      const totals = cartItems.reduce(
        (acc, item) => {
          const quantity = item.quantity;
          const price = item.product[SIZE_PRICE_MAPPER[item.size]];
          const amount = price * quantity;
          return {
            totalAmount: acc.totalAmount + amount,
            totalQuantity: acc.totalQuantity + item.quantity,
          };
        },
        { totalAmount: 0, totalQuantity: 0 }
      );

      state.items = items;
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    },
  },
});

export const CartActions = cartSlice.actions;
export const CartReducer = cartSlice.reducer;
