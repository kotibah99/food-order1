import { useContext } from 'react';
import {
  Box,
  Flex,
  Stack,
  Button,
  Heading,
  IconButton,
} from '@chakra-ui/react';

import { Icon } from '../../UI/Icons';
import { AuthContext } from '../../../store/AuthContext';

export const ComunicationSection = () => {
  const { token } = useContext(AuthContext);
  const { footer } = token.translation;

  return (
    <Stack h="full" justify="space-around">
      <Button
        fontSize="xl"
        variant="link"
        colorScheme="none"
        leftIcon={<Icon name="location" />}
        _hover={{
          opacity: '70%',
          transition: 'opacity 250ms ease-in-out 0s',
        }}
      >
        {footer.locations}
      </Button>

      <Box>
        <Heading size="sm" textAlign="center" mb={2}>
          {footer['contact-us']}
        </Heading>
        <Flex gap={5}>
          <IconButton
            aria-label="phone icon"
            variant="unstyled"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={<Icon name="phone" boxSize={6} />}
          />
          <IconButton
            variant="unstyled"
            aria-label="facebook icon"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={<Icon name="facebook" boxSize={6} />}
          />
          <IconButton
            variant="unstyled"
            aria-label="whatsapp icon"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={<Icon name="whatsapp" boxSize={6} />}
          />
        </Flex>
      </Box>
    </Stack>
  );
};
