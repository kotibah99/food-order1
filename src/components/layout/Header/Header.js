import { useContext } from 'react';
import { Flex, Divider } from '@chakra-ui/react';

import { LaguageSwitcher } from './LaguageSwitcher';
import { HeaderMenuList } from './HeaderMenuList';
import { AuthContext } from '../../../store/AuthContext';
import { CartButton } from './CartButton';
import { SearchBox } from './SearchBox';
import { Logo } from '../../UI/Logo';
import { Link } from './Link';

export const Header = () => {
  const { token, isLoggedIn } = useContext(AuthContext);
  const { foodMenu, user } = token.translation.header;

  return (
    <Flex
      as="header"
      gap={5}
      px={2}
      w="full"
      h="70px"
      top={0}
      shadow="md"
      pos="fixed"
      zIndex={200}
      align="center"
      color="brand.500"
      bg="secondary.700"
    >
      <Logo />
      <Link to="menu" name={foodMenu} />
      <SearchBox />
      {isLoggedIn && <HeaderMenuList />}
      {!isLoggedIn && <Link to="user" name={user} />}
      <CartButton />
      <Divider h="25px" orientation="vertical" />
      <LaguageSwitcher />
    </Flex>
  );
};
