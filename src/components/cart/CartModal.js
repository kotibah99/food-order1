import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Flex, List, Button, Heading, Stack } from '@chakra-ui/react';

import { CURRENCY_FORMATER } from '../../utils/helpers';
import { AuthContext } from '../../store/AuthContext';
import { CartItem } from './CartItem';
import { Modal } from '../UI/Modal';

export const CartModal = ({ onClose, isOpen }) => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { items, totalAmount } = useSelector(state => state.cart);

  const { locale } = token;

  const hasItems = items.length > 0;
  const { cartModal, closeBtn } = token.translation;
  const { tasteMapper, sizeMapper } = token.translation.productDetails;

  const header = cartModal.title;
  const body = (
    <List>
      {items.map(item => (
        <CartItem
          {...item}
          key={item.productId}
          taste={tasteMapper[item.taste - 1]}
          itemSize={sizeMapper[item.size - 1]}
        />
      ))}
    </List>
  );

  const footer = (
    <Stack w="full">
      <Flex justify="space-between">
        <Heading size="md">{cartModal.total}</Heading>
        <Heading size="md">{CURRENCY_FORMATER(locale, totalAmount)}</Heading>
      </Flex>
      <Flex gap={{ base: 1, md: 2 }}>
        <Button
          size="md"
          variant="outline"
          colorScheme="brand"
          onClick={onClose}
        >
          {closeBtn}
        </Button>

        {hasItems && (
          <Button
            size="md"
            isDisabled={totalAmount > 999}
            variant="brand"
            onClick={() => {
              onClose();
              navigate('/checkout', { replace: true });
            }}
          >
            {cartModal.actionBtn}
          </Button>
        )}
      </Flex>
    </Stack>
  );

  return (
    <Modal
      header={header}
      body={body}
      footer={footer}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
