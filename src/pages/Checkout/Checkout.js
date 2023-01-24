import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Button, useToast, Stack } from '@chakra-ui/react';

import { OrdersActions } from '../../store/OrdersSlice';
import { CartPreview } from './CartPreview';
import { AddressList } from './AddressList';
import { AuthContext } from '../../store/AuthContext';
import { CartActions } from '../../store/CartSlice';
import useMutateData from '../../hooks/useMutateData';

const Checkout = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const cart = useSelector(state => state.cart);
  const [addressId, setAddressId] = useState(null);
  const { isLoading, request } = useMutateData({ key: 'order' });

  const { btnLoadingText } = token.translation;
  const { actionBtn } = token.translation.checkout;
  const { items, totalAmount, totalQuantity } = cart;
  const canPlaceOrder = !!addressId && !!totalQuantity && totalAmount < 1000;

  const placeOrderHandler = () => {
    const date = new Date();
    const userId = token.user.id;

    const orderDetails = items.map(item => {
      return {
        drinkId: 1,
        size: item.size,
        taste: item.taste,
        quantity: item.quantity,
        productId: item.productId,
      };
    });

    const config = {
      method: 'post',
      data: {
        orderDetails,
        orderStatus: 1,
        pymentMethod: 1,
        restaurantId: 1,
        deliveryFee: 14,
        total: totalAmount,
        customerId: userId,
        orderDate: date.toJSON(),
        deliveryAddressId: addressId,
      },
    };

    request(config).then(data => {
      dispatch(CartActions.clearCart());
      dispatch(OrdersActions.addNewOrder(data));

      toast({
        title: 'Success',
        description: 'order placed successfully, stay tuned',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      navigate('/', { replace: true });
    });
  };

  return (
    <Flex
      px={2}
      mt={5}
      gap={{ base: 10, md: 5 }}
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Flex flex={2}>
        <CartPreview />
      </Flex>
      <Stack flex={3} h="full">
        <AddressList onAddressId={setAddressId} />
        <Button
          variant="brand"
          isLoading={isLoading}
          loadingText={btnLoadingText}
          isDisabled={!canPlaceOrder}
          onClick={placeOrderHandler}
        >
          {actionBtn}
        </Button>
      </Stack>
    </Flex>
  );
};

export default Checkout;
