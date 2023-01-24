import { IconButton } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from '../../components/UI/Icons';
import { FavoriteActions } from '../../store/FavoriteSlice';

export const FavoriteButton = ({ product }) => {
  const dispatch = useDispatch();
  const { favoriteList } = useSelector(state => state.favorite);

  const isFavorite = favoriteList.some(item => item.id === product?.id);

  const toggleFavoriteHandler = () => {
    if (isFavorite) {
      dispatch(FavoriteActions.removeFromFavorite({ id: product?.id }));
    } else {
      dispatch(FavoriteActions.addToFavorite(product));
    }
  };

  return (
    <IconButton
      aria-label="favorite"
      variant="outline"
      colorScheme="brand"
      icon={
        isFavorite ? (
          <Icon name="favFilled" color="red.500" />
        ) : (
          <Icon name="fav" />
        )
      }
      onClick={toggleFavoriteHandler}
    />
  );
};
