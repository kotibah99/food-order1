import { useNavigate } from 'react-router-dom';
import { Flex, Heading, ListItem } from '@chakra-ui/react';

import { PATH } from '../../data/constants';
import { ImagePreview } from '../../components/UI/ImagePreview';

export const MenuItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Flex
      as={ListItem}
      shadow="md"
      rounded="md"
      pos="relative"
      cursor="pointer"
      justify="center"
      overflow="hidden"
      boxSize={{ base: '80vw', md: 'xs', '2xl': 'lg' }}
      onClick={() => navigate(`/menu/${item.id}`)}
    >
      <Heading top="30%" pos="absolute" display="flex" px={5}>
        {item.title}
      </Heading>
      <ImagePreview
        ratio={1}
        boxSize="full"
        alt={item.title}
        src={PATH.FILE + item?.image}
        _hover={{
          opacity: '25%',
          transform: 'scale(1.1)',
          transition: 'all 0.4s',
        }}
      />
    </Flex>
  );
};
