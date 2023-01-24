import { useContext } from 'react';
import { Flex, Heading, VStack } from '@chakra-ui/react';

import { AuthContext } from '../../context/AuthContext';
import { MealItem } from '../Meals/MealItem';

const data = [
  { title: 'coffee' },
  { title: 'coffee' },
  { title: 'coffee' },
  { title: 'coffee' },
];

export const Feature = () => {
  const { token } = useContext(AuthContext);
  const { FeatureSection } = token.translation.home;

  return (
    <VStack as="section" minW="95vw">
      <Heading size="lg">{FeatureSection}</Heading>
      <Flex as="ul" wrap="wrap" gap={2} rowGap={3} justify="center">
        {data.map((item, idx) => (
          <MealItem key={idx} item={item} />
        ))}
      </Flex>
    </VStack>
  );
};
