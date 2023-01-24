import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { NavLink } from './NavLink';

export const Navbar = ({ ignore }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { menuList } = useSelector(state => state.menu);

  useEffect(() => {
    if (id || ignore || menuList.length === 0) return;
    navigate(`/menu/${menuList[0].id}`);
  });

  return (
    <Flex
      as="nav"
      mb={2}
      gap={4}
      overflowX="hidden"
      w={{ base: 'max-content', lg: '100vw' }}
      flexDir={{ base: 'column', lg: 'row' }}
    >
      {menuList.map(item => (
        <NavLink
          key={item.id}
          name={item.title}
          to={`/menu/${item.id}`}
          isActive={+id === item.id}
        />
      ))}
    </Flex>
  );
};
