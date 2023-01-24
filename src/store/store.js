import { configureStore } from '@reduxjs/toolkit';

import { MenuReducer } from './MenuSlice';
import { CartReducer } from './CartSlice';
import { OrdersReducer } from './OrdersSlice';
import { AddressReducer } from './AddressSlice';
import { FavoriteReducer } from './FavoriteSlice';

const store = configureStore({
  reducer: {
    cart: CartReducer,
    menu: MenuReducer,
    orders: OrdersReducer,
    address: AddressReducer,
    favorite: FavoriteReducer,
  },
});

export default store;
