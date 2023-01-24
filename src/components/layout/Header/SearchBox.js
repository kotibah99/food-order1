import { useContext } from 'react';
import {
  useDisclosure,
  Button,
  Flex,
  Text,
  IconButton,
} from '@chakra-ui/react';

import { AuthContext } from '../../../store/AuthContext';
import { SearchModal } from './SearchModal';
import { Icon } from '../../UI/Icons';

export const SearchBox = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { token } = useContext(AuthContext);
  const { search } = token.translation.header;

  return (
    <>
      <SearchModal isOpen={isOpen} onClose={onClose} />
      <IconButton
        icon={<Icon name="search" boxSize={5} />}
        display={{ base: 'block', lg: 'none' }}
        variant="unstyled"
        onClick={onOpen}
        aria-label="search"
      />
      <Button
        display={{ base: 'none', lg: 'block' }}
        w="full"
        minW="min-content"
        bg="secondary.50"
        onClick={onOpen}
      >
        <Flex
          gap={2}
          w="full"
          h="full"
          align="center"
          color="secondary.300"
          fontWeight="normal"
        >
          <Icon name="search" />
          <Text>{search.placeholder}</Text>
        </Flex>
      </Button>
    </>
  );
};
