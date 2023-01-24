import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, List, Stack, HStack, Heading, Divider } from '@chakra-ui/react';

import { CURRENCY_FORMATER, NUMBER_FORMATER } from '../../utils/helpers';
import { SkeletonCart } from '../../components/UI/SkeletonCart';
import { useFetchById } from '../../hooks/useFetchById';
import { AuthContext } from '../../store/AuthContext';
import { CartActions } from '../../store/CartSlice';
import { SingleItem } from './SingleItem';
import { PATH } from '../../data/constants';

export const CartPreview = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { token, lang } = useContext(AuthContext);

  const { isLoading, data: cartItems } = useFetchById({
    lang,
    key: 'cart',
    id: token.user?.id,
  });

  useEffect(() => {
    if (cartItems) {
      dispatch(CartActions.replaceCartItems(cartItems));
    }
  }, [cartItems, dispatch]);

  const deliveryFee = 14;
  const { locale } = token;
  const { summery, subtotal, shipping, total, item } =
    token.translation.checkout;

  const { items, totalQuantity, totalAmount } = cart;
  const hasItems = items.length !== 0;

  return (
    <Stack w="full" h="full">
      <HStack>
        <Heading size="lg">{summery}</Heading>
        <Text as="b" fontSize="xs" color="gray.600">
          ({NUMBER_FORMATER(locale, totalQuantity)} {item})
        </Text>
      </HStack>

      <SkeletonCart isLoaded={!isLoading}>
        <Stack as={List}>
          {items?.map(item => (
            <SingleItem
              title={item.title}
              key={item.productId}
              amount={item.amount}
              createOn={item.createOn}
              quantity={item.quantity}
              image={PATH.FILE + item.image}
            />
          ))}
        </Stack>

        {hasItems && (
          <Stack mt={2}>
            <Divider />
            <HStack justify="space-between">
              <Text color="gray.600">{subtotal}</Text>
              <Heading size="sm">
                {CURRENCY_FORMATER(locale, totalAmount)}
              </Heading>
            </HStack>
            <HStack w="full" justify="space-between">
              <Text color="gray.600">{shipping}</Text>
              <Heading size="sm">
                {CURRENCY_FORMATER(locale, deliveryFee)}
              </Heading>
            </HStack>
            <Divider />
            <HStack justify="space-between" w="full">
              <Text color="gray.600">{total}</Text>
              <Heading size="md">
                {CURRENCY_FORMATER(locale, totalAmount + deliveryFee)}
              </Heading>
            </HStack>
          </Stack>
        )}
      </SkeletonCart>
    </Stack>
  );
};
