import {
  Text,
  Flex,
  HStack,
  Heading,
  ListItem,
  IconButton,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CURRENCY_FORMATER, DISCOUNT_CALCULATOR } from '../utils/helpers';
import { FavoriteActions } from '../store/FavoriteSlice';
import { ImagePreview } from './UI/ImagePreview';
import { CartActions } from '../store/CartSlice';
import { AuthContext } from '../store/AuthContext';
import useMutateData from '../hooks/useMutateData';
import { PATH } from '../data/constants';
import { Icon } from './UI/Icons';

export const MealItem = ({ item, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { request } = useMutateData({ key: 'cart' });
  const { token, isLoggedIn } = useContext(AuthContext);
  const { locale } = token;
  const isArabic = locale === 'ar-EG';
  const rounded = isArabic ? { roundedEnd: 'md' } : { roundedStart: 'md' };

  const orderSubmitHandler = () => {
    const createOn = new Date();
    const price = DISCOUNT_CALCULATOR(item.smallSizePrice, item.discountValue);

    const data = {
      ...item,
      price,
      size: 1,
      taste: 1,
      drinkId: 1,
      quantity: 1,
      amount: price,
      productId: item.id,
      createOn: createOn.toJSON(),
      customerId: token.user.id,
    };

    request({ method: 'post', data });
    dispatch(CartActions.addItemToCart(data));
    dispatch(FavoriteActions.removeFromFavorite({ id: item.id }));
  };

  return (
    <Flex
      as={ListItem}
      shadow="md"
      rounded="md"
      w={{ base: 'full', md: 'xs' }}
      {...props}
    >
      <Flex flex={1}>
        <ImagePreview
          ratio={1}
          boxSize="full"
          cursor="pointer"
          rounded={rounded}
          alt={item?.title}
          src={PATH.FILE + item?.image}
          onClick={() => navigate(`/meal/${item.id}`)}
        />
      </Flex>
      <Flex
        flex={1}
        p={2}
        align="start"
        flexDir="column"
        justify={{ base: 'space-evenly', md: 'space-between' }}
      >
        <Heading size="sm">{item.title}</Heading>
        <Text as="b" fontSize={{ base: 'sm', md: 'md' }}>
          {CURRENCY_FORMATER(locale, item.smallSizePrice)}
        </Text>
        <HStack>
          <IconButton
            variant="brand"
            aria-label="cart icon"
            size={{ base: 'sm', md: 'md' }}
            icon={<Icon name="cart" />}
            isDisabled={!isLoggedIn}
            onClick={orderSubmitHandler}
          />
          <IconButton
            variant="brand"
            aria-label="view icon"
            size={{ base: 'sm', md: 'md' }}
            icon={<Icon name="view" />}
            onClick={() => navigate(`/meal/${item.id}`)}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};
