import { useContext } from 'react';
import { Box, Heading, Stack } from '@chakra-ui/react';

import { AuthContext } from '../../../store/AuthContext';
import { AndroidBadge } from '../../UI/AndroidBadge';
import { LanguageSelector } from '../Header/LanguageSelector';

export const FeaturesSection = () => {
  const { token } = useContext(AuthContext);
  const { onYourMobile } = token.translation.footer;

  return (
    <Stack h="full" align="center" justify="space-around">
      <Box>
        <Heading size="sm" textAlign="center">
          {onYourMobile}
        </Heading>
        <AndroidBadge />
      </Box>
      <LanguageSelector />
    </Stack>
  );
};
