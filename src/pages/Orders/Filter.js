import { Select } from '@chakra-ui/react';
import { useContext } from 'react';

import { AuthContext } from '../../store/AuthContext';

export const Filter = ({ onChange }) => {
  const { token } = useContext(AuthContext);
  const { states } = token.translation.orders;
  const { filter } = token.translation;

  return (
    <Select dir="ltr" w="9em" placeholder={filter} onChange={onChange}>
      {states.map((state, idx) => (
        <option key={idx} value={idx + 1}>
          {state}
        </option>
      ))}
    </Select>
  );
};
