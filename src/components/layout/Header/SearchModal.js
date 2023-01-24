import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Box, List, Input, HStack, Heading } from '@chakra-ui/react';

import { useFetchById } from '../../../hooks/useFetchById';
import { ImagePreview } from '../../UI/ImagePreview';
import { AuthContext } from '../../../store/AuthContext';
import { PATH } from '../../../data/constants';
import { Modal } from '../../UI/Modal';

export const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { token, lang } = useContext(AuthContext);

  const { search } = token.translation.header;
  const isValidQuery = searchQuery.length >= 2;

  const { data } = useFetchById({
    lang,
    key: 'search',
    id: isValidQuery ? searchQuery : null,
  });

  const header = (
    <Box pe={5}>
      <Input
        type="search"
        name="search"
        placeholder={search.placeholder}
        onChange={event => setSearchQuery(event.target.value.trim())}
      />
    </Box>
  );

  const content = (
    <List>
      {data?.map(item => (
        <HStack
          as={Link}
          key={item.id}
          p={2}
          my={2}
          rounded="md"
          bg="gray.100"
          onClick={onClose}
          borderStyle="brand.500"
          justify="space-between"
          to={`/meal/${item.id}`}
          _hover={{ bg: 'brand.400' }}
        >
          <Heading size="md">{item.title}</Heading>
          <ImagePreview
            boxSize={12}
            src={PATH.FILE + item?.image}
            alt={item?.title}
          />
        </HStack>
      ))}
    </List>
  );

  return (
    <Modal header={header} body={content} isOpen={isOpen} onClose={onClose} />
  );
};
