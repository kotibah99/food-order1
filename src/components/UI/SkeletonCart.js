import { SkeletonText, SkeletonCircle, Flex } from '@chakra-ui/react';

export const SkeletonCart = ({ isLoaded, children }) => {
  return (
    <Flex gap={2}>
      <SkeletonCircle
        rounded="md"
        isLoaded={isLoaded}
        size={!isLoaded ? 20 : 0}
      />
      <SkeletonText
        flex={1}
        spacing={4}
        noOfLines={4}
        fadeDuration={1}
        isLoaded={isLoaded}
      >
        {children}
      </SkeletonText>
    </Flex>
  );
};
