import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';

import { NUMBER_FORMATER } from '../../../utils/helpers';
import { AuthContext } from '../../../store/AuthContext';
import { CartModal } from '../../cart/CartModal';
import { Icon } from '../../UI/Icons';

export const CartButton = () => {
  const qty = useSelector(state => state.cart.totalQuantity);
  const { token } = useContext(AuthContext);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const { locale } = token;
  const { cartButton } = token.translation.header;

  return (
    <>
      <CartModal onClose={onClose} isOpen={isOpen} />
      <Button
        rounded="xl"
        variant="brand"
        minW="min-content"
        color="secondary.700"
        onClick={onOpen}
      >
        <HStack justify="center" spacing={1}>
          <Icon name="cart" boxSize={6} />
          <Text>{cartButton}</Text>
          <Text
            px={2}
            py={1}
            rounded="full"
            color="brand.400"
            bg="secondary.700"
          >
            {NUMBER_FORMATER(locale, qty)}
          </Text>
        </HStack>
      </Button>
    </>
  );
};
