import {
  Menu,
  Button,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Icon } from '../../UI/Icons';
import { AuthContext } from '../../../store/AuthContext';
import { CartActions } from '../../../store/CartSlice';
import { FavoriteModal } from '../../favorite/FavoriteModal';
import { FavoriteActions } from '../../../store/FavoriteSlice';

export const HeaderMenuList = () => {
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 905px)');

  // context
  const dispatch = useDispatch();
  const { token, lang, logout } = useContext(AuthContext);

  const isArabic = lang === 'ar';
  const { menu } = token.translation.header;
  const firstName = token.user.fullName.split(' ')[0];
  const mobileIcon = isArabic ? 'arrowLeft' : 'arrowRight';

  const logoutHandler = () => {
    dispatch(CartActions.clearCart());
    dispatch(FavoriteActions.clearFavoriteList());
    logout();
  };

  return (
    <>
      <FavoriteModal isOpen={isOpen} onClose={onClose} />
      <Menu isLazy>
        <MenuButton
          as={Button}
          _hover={{}}
          variant="link"
          fontWeight="bold"
          minW="min-content"
          colorScheme={isMobile ? 'secondary' : 'brand'}
          rightIcon={
            <Icon name={isMobile ? mobileIcon : 'dropdownMenu'} boxSize={6} />
          }
        >
          {menu.buttonText} {firstName}
        </MenuButton>

        <MenuList fontSize="lg" color="secondary.500">
          <MenuItem
            justifyContent={{ base: 'center', lg: 'start' }}
            onClick={() => navigate('profile')}
          >
            {menu.list[0]}
          </MenuItem>
          <MenuItem
            justifyContent={{ base: 'center', lg: 'start' }}
            onClick={() => navigate('orders')}
          >
            {menu.list[1]}
          </MenuItem>
          <MenuItem
            justifyContent={{ base: 'center', lg: 'start' }}
            onClick={onOpen}
          >
            {menu.list[2]}
          </MenuItem>
          <MenuDivider />
          <MenuItem justifyContent="center" onClick={logoutHandler}>
            {menu.logout}
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
