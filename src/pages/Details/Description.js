import { Flex, Heading, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';
import { CURRENCY_FORMATER, DISCOUNT_CALCULATOR } from '../../utils/helpers';

export const Description = ({ product, price }) => {
  const { token } = useContext(AuthContext);

  const { locale } = token;
  const { kcal } = token.translation.productDetails;

  const hasDiscount = product?.discountValue !== 0;

  return (
    <Flex flexDir="column" gap={5}>
      <Heading>{product?.title}</Heading>
      <Text as="i" fontSize="sm">
        {product?.calories} {kcal}
      </Text>

      <Flex gap={2}>
        <Text
          as={product?.discountValue ? 'del' : 'b'}
          fontSize={product?.discountValue ? 'sm' : 'lg'}
        >
          {CURRENCY_FORMATER(locale, price)}
        </Text>
        {hasDiscount && (
          <Text as="b" fontSize="lg">
            {CURRENCY_FORMATER(
              locale,
              DISCOUNT_CALCULATOR(price, product?.discountValue)
            )}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
