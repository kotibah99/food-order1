import React, { useContext } from 'react';

import QuantityButton from './QuantityButton';
import { AuthContext } from '../../store/AuthContext';
import { FormControl, FormLabel, VStack } from '@chakra-ui/react';

export const QuantityControl = ({ dispatch }) => {
  const { token } = useContext(AuthContext);

  const { quantityLabel } = token.translation.productDetails;

  return (
    <FormControl as={VStack} align="start" spacing={-2}>
      <FormLabel fontSize="xs">{quantityLabel}</FormLabel>
      <QuantityButton
        min={1}
        max={15}
        defaultValue={1}
        onChange={value => dispatch({ type: 'QUANTITY', value: +value })}
      />
    </FormControl>
  );
};
