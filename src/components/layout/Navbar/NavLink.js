import { Link } from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';

export const NavLink = ({ to, name, isActive }) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      _hover={{
        borderBottomWidth: '2px',
        borderBottomColor: 'brand.500',
      }}
      borderBottom={isActive ? '2px' : null}
      fontWeight={{ base: 'normal', md: 'bold' }}
      borderColor={isActive ? 'brand.500' : null}
      color={{ base: 'black', lg: isActive ? 'secondary.500' : 'gray' }}
    >
      {name}
    </Link>
  );
};
