import { useContext } from 'react';
import { Flex, Text, Stack, VStack, Heading, ListItem } from '@chakra-ui/react';

import {
  DATE_FORMATER,
  NUMBER_FORMATER,
  CURRENCY_FORMATER,
} from '../../utils/helpers';
import { ImagePreview } from '../../components/UI/ImagePreview';
import { AuthContext } from '../../store/AuthContext';

export const SingleItem = ({ title, image, quantity, amount, createOn }) => {
  const { token } = useContext(AuthContext);

  const { locale } = token;
  const { item } = token.translation.checkout;

  return (
    <ListItem bg="gray.50" rounded="md" p={2}>
      <Flex gap={5}>
        <VStack spacing={0}>
          <ImagePreview src={image} alt={title} ratio={1} w={20} />
          <Text color="gray.600">
            {NUMBER_FORMATER(locale, quantity)} {item}
          </Text>
        </VStack>
        <Stack w="full">
          <Heading size="md">{title}</Heading>
          <Text as="b">{CURRENCY_FORMATER(locale, amount)}</Text>
          <Text as="b" color="green">
            {DATE_FORMATER(locale, createOn)}
          </Text>
        </Stack>
      </Flex>
    </ListItem>
  );
};
