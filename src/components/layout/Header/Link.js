import { NavLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

export const Link = ({ to, name }) => {
  return (
    <ChakraLink
      to={to}
      fontWeight="bold"
      minW="min-content"
      _hover={{}}
      as={props => (
        <NavLink
          {...props}
          style={({ isActive }) => {
            return { opacity: isActive ? '70%' : '100%' };
          }}
        />
      )}
    >
      {name}
    </ChakraLink>
  );
};
