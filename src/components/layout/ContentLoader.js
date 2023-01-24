import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';

import { OrdersActions } from '../../store/OrdersSlice';
import { useFetchById } from '../../hooks/useFetchById';
import { AuthContext } from '../../store/AuthContext';
import { CartActions } from '../../store/CartSlice';
import { MenuActions } from '../../store/MenuSlice';

export const ContentLoader = () => {
  const dispatch = useDispatch();
  const { token, lang } = useContext(AuthContext);

  // cart data
  const { data: cart } = useFetchById({
    lang,
    key: 'cart',
    id: token.user?.id,
  });
  // orders data
  const { data: orders } = useFetchById({
    lang,
    key: 'orders',
    id: token.user?.id,
  });
  // menu data
  const { data: categories } = useFetchById({
    lang,
    id: 'all',
    key: 'categories',
  });

  useEffect(() => {
    if (cart) {
      dispatch(CartActions.replaceCartItems(cart));
    }
  }, [dispatch, cart]);

  useEffect(() => {
    if (orders) {
      dispatch(OrdersActions.replaceOrders(orders));
    }
  }, [dispatch, orders]);

  useEffect(() => {
    if (categories) {
      dispatch(MenuActions.replaceMenuList(categories));
    }
  }, [dispatch, categories]);

  return null;
};
