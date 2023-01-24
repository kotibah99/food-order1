import { useContext } from 'react';
import { Heading, VStack, Flex, List, Skeleton } from '@chakra-ui/react';

import { MenuItem } from './MenuItem';
import { AuthContext } from '../../store/AuthContext';
import { useSelector } from 'react-redux';

export const Menu = () => {
  const { token } = useContext(AuthContext);
  const { menuList } = useSelector(state => state.menu);

  const { ourMenu } = token.translation.home;
  const isLoaded = menuList.length !== 0;

  return (
    <VStack as="section" spacing={5} mt={20}>
      <Heading>{ourMenu.title}</Heading>

      <Skeleton isLoaded={isLoaded} fadeDuration={1} minH="50vh">
        <Flex as={List} flexWrap="wrap" justifyContent="center" gap={5}>
          {menuList.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </Flex>
      </Skeleton>
    </VStack>
  );
};
