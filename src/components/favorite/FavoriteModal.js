import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Button, List } from '@chakra-ui/react';

import { AuthContext } from '../../store/AuthContext';
import { MealItem } from '../MealItem';
import { Modal } from '../UI/Modal';

export const FavoriteModal = ({ isOpen, onClose }) => {
  const { token } = useContext(AuthContext);
  const { favoriteList } = useSelector(state => state.favorite);

  const { closeBtn, favorite } = token.translation;

  const body = (
    <List>
      {favoriteList.map(item => (
        <MealItem
          mb={2}
          item={item}
          maxH={32}
          minW="full"
          bg="gray.50"
          shadow="none"
          border="1px"
          key={item.id}
        />
      ))}
    </List>
  );
  const footer = (
    <Button variant="outline" colorScheme="brand" mr={3} onClick={onClose}>
      {closeBtn}
    </Button>
  );

  return (
    <Modal
      size="md"
      header={favorite}
      body={body}
      footer={footer}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
