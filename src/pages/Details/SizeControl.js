import React, { useContext } from 'react';
import { FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';

import { AuthContext } from '../../store/AuthContext';

export const SizeControl = ({ product, dispatch }) => {
  const { token } = useContext(AuthContext);

  const { sizeMapper, sizeLabel } = token.translation.productDetails;

  return (
    <FormControl as={Stack} w="full" spacing={-2}>
      <FormLabel fontSize="xs">{sizeLabel}</FormLabel>
      <Select
        dir="ltr"
        onChange={event =>
          dispatch({ type: 'SIZE', value: +event.target.value })
        }
      >
        <option value={1}>{sizeMapper[0]}</option>
        {product?.mediumSizePrice && <option value={2}>{sizeMapper[1]}</option>}
        {product?.bigSizePrice && <option value={3}>{sizeMapper[2]}</option>}
      </Select>
    </FormControl>
  );
};
