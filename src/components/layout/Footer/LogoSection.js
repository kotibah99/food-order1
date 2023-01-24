import { useContext } from 'react';
import { AuthContext } from '../../../store/AuthContext';
import { Stack, Text } from '@chakra-ui/react';

import { Logo } from '../../UI/Logo';

export const LogoSection = () => {
  const { token } = useContext(AuthContext);
  const { footer } = token.translation;

  return (
    <Stack align={{ base: 'center', md: 'start' }}>
      <Logo />
      <Text fontSize={{ base: 'x-small', md: 'xs' }} fontWeight="bold">
        {footer.motto}
      </Text>
      <Text fontSize={{ base: 'x-small', md: 'xs' }} fontWeight="bold">
        {footer['CR-No']} 1010143207
      </Text>
      <Text fontSize={{ base: 'x-small', md: 'xs' }} fontWeight="bold">
        {footer['VAT-No']} 300056049100002
      </Text>
    </Stack>
  );
};
