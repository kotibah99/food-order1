import React, { useContext } from 'react';
import { HStack, Radio, RadioGroup } from '@chakra-ui/react';

import { AuthContext } from '../../store/AuthContext';

export const TasteControl = ({ product, dispatch, taste }) => {
  const { token } = useContext(AuthContext);

  const { tasteMapper } = token.translation.productDetails;

  return (
    <RadioGroup
      colorScheme="brand"
      value={taste}
      onChange={value => dispatch({ type: 'TASTE', value })}
    >
      <HStack>
        <Radio value="1">{tasteMapper[0]}</Radio>
        {product?.hasTaste > 0 && <Radio value="2">{tasteMapper[1]}</Radio>}
      </HStack>
    </RadioGroup>
  );
};
