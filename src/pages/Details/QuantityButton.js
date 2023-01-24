import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';

const QuantityButton = props => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({ ...props });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack minW="full">
      <Button variant="brand" {...inc}>
        +
      </Button>
      <Input {...input} />
      <Button variant="brand" {...dec}>
        -
      </Button>
    </HStack>
  );
};

export default QuantityButton;
