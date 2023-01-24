import { useContext } from 'react';
import { Button, Flex, HStack, ListItem, Text } from '@chakra-ui/react';

import { CURRENCY_FORMATER, NUMBER_FORMATER } from '../../utils/helpers';
import { AuthContext } from '../../store/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import { PATH } from '../../data/constants';

import { useDispatch, useSelector } from 'react-redux';
import { CartActions } from '../../store/CartSlice';

export const CartItem = props => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const { token } = useContext(AuthContext);
  const { request } = useMutateData({ key: 'cart' });

  const { locale } = token;
  const { productId, title, quantity, price, amount, taste, itemSize } = props;

  const onAddToCartHandler = () => {
    const mutateItem = cart.items.find(item => item.productId === productId);
    dispatch(CartActions.addItemToCart({ ...mutateItem, quantity: 1 }));

    const config = {
      method: 'post',
      data: {
        ...mutateItem,
        quantity: quantity + 1,
        customerId: token.user.id,
      },
    };

    request(config).catch(() => {
      dispatch(CartActions.removeItemFromCart(productId));
    });
  };

  const onRemoveItemHandler = () => {
    dispatch(CartActions.removeItemFromCart(productId));
    const mutateItem = cart.items.find(item => item.productId === productId);

    let config;
    if (mutateItem.quantity > 1) {
      config = {
        method: 'post',
        data: {
          ...mutateItem,
          customerId: token.user.id,
          quantity: mutateItem.quantity - 1,
        },
      };
    } else {
      config = {
        method: 'delete',
        url: `ar/${PATH.CART}/${token.user.id}/${productId}`,
      };
    }
    request(config).catch(() => {
      dispatch(CartActions.addItemToCart({ ...mutateItem, quantity: 1 }));
    });
  };

  return (
    <ListItem bg="gray.100" mb={2} p={2}>
      <Flex flexDir="column" gap={3}>
        <Flex justify="space-between">
          <Text as="b">{title}</Text>
          <Text as="b">
            {CURRENCY_FORMATER(locale, amount)}{' '}
            <Text as="i" fontWeight="normal" fontSize="sm">
              ({CURRENCY_FORMATER(locale, price)}/
              {NUMBER_FORMATER(locale, quantity)})
            </Text>
          </Text>
        </Flex>
        <Flex justify="space-between">
          <span>
            x
            <Text as="b" fontSize="md">
              {NUMBER_FORMATER(locale, quantity)}
            </Text>
            <span>
              {' '}
              ({itemSize} - {taste})
            </span>
          </span>
          <HStack>
            <Button
              size="sm"
              variant="outline"
              colorScheme="brand"
              onClick={onRemoveItemHandler}
            >
              -
            </Button>
            <Button
              isDisabled={quantity === 15}
              size="sm"
              variant="outline"
              colorScheme="brand"
              onClick={onAddToCartHandler}
            >
              +
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </ListItem>
  );
};
