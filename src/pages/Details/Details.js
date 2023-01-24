import {
  Text,
  Stack,
  Spacer,
  HStack,
  Button,
  Skeleton,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useReducer } from 'react';

import { CURRENCY_FORMATER, DISCOUNT_CALCULATOR } from '../../utils/helpers';
import { PATH, SIZE_PRICE_MAPPER } from '../../data/constants';
import { QuantityControl } from './QuantityControl';
import { FavoriteButton } from './FavoriteButton';
import { TasteControl } from './TasteControl';
import { useFetchById } from '../../hooks/useFetchById';
import { ImagePreview } from '../../components/UI/ImagePreview';
import { AuthContext } from '../../store/AuthContext';
import { SizeControl } from './SizeControl';
import { Description } from './Description';
import { CartActions } from '../../store/CartSlice';
import useMutateData from '../../hooks/useMutateData';

const initialState = {
  size: 1,
  price: 0,
  taste: '1', // coz Radio like it as a string
  quantity: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIZE':
      return { ...state, size: action.value };
    case 'PRICE':
      return { ...state, price: action.value };
    case 'TASTE':
      return { ...state, taste: action.value };
    case 'QUANTITY':
      return { ...state, quantity: action.value };
    default:
      return initialState;
  }
};

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isLoggedIn, lang } = useContext(AuthContext);
  const [orderState, dispatchOrder] = useReducer(reducer, initialState);

  const locale = token.locale;
  const { addToCartBtn } = token.translation.productDetails;

  const { request } = useMutateData({ key: 'cart' });
  const {
    error,
    isLoading,
    data: product,
  } = useFetchById({
    id,
    lang,
    key: 'product',
  });

  useEffect(() => {
    if (error) {
      navigate('/not-found', { replace: true });
    }
  }, [error, navigate]);

  useEffect(() => {
    if (product) {
      dispatchOrder({
        type: 'PRICE',
        value: product[SIZE_PRICE_MAPPER[orderState.size]],
      });
    }
  }, [product, orderState.size]);

  const addToCartHandler = () => {
    const price = DISCOUNT_CALCULATOR(orderState.price, product.discountValue);
    const createOn = new Date();

    const itemData = {
      price,
      drinkId: 1,
      title: product.title,
      image: product.image,
      size: orderState.size,
      productId: product.id,
      taste: orderState.taste,
      customerId: token.user.id,
      createOn: createOn.toJSON(),
      quantity: orderState.quantity,
      amount: price * orderState.quantity,
    };

    dispatch(CartActions.addItemToCart(itemData));

    const config = { method: 'post', data: itemData };
    request(config);
  };

  return (
    <Skeleton isLoaded={!isLoading} fadeDuration={1}>
      <SimpleGrid
        px={5}
        mt={5}
        mb={20}
        mx="auto"
        gap={5}
        columns={{ base: 1, md: 2 }}
        maxW={{ base: 'full', md: '1024px' }}
      >
        <GridItem>
          <ImagePreview
            ratio={1}
            alt={product?.title}
            src={product ? PATH.FILE + product.image : null}
          />
        </GridItem>

        <GridItem as={Stack} spacing={5}>
          <Description product={product} price={orderState.price} />
          <SizeControl product={product} dispatch={dispatchOrder} />
          <TasteControl
            product={product}
            taste={orderState.taste}
            dispatch={dispatchOrder}
          />
          <QuantityControl dispatch={dispatchOrder} />
          <HStack>
            <Button
              variant="brand"
              isDisabled={
                !isLoggedIn || orderState.price * orderState.quantity > 999
              }
              onClick={addToCartHandler}
            >
              {addToCartBtn}
            </Button>
            <FavoriteButton product={product} />
            <Spacer />
            <Text as="b">
              {CURRENCY_FORMATER(
                locale,
                orderState.price * orderState.quantity
              )}
            </Text>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </Skeleton>
  );
};

export default Details;
