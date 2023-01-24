import { Button, Flex } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

import { AuthContext } from '../../../store/AuthContext';

export const LaguageSwitcher = () => {
  const { lang, setLocale } = useContext(AuthContext);
  const isArabic = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic, lang]);

  return (
    <Flex h={7} p={1} rounded="lg" align="center" bg="brand.400">
      <Button
        size="xs"
        rounded="lg"
        variant="brand"
        fontSize="10px"
        color="secondary.500"
        isActive={!isArabic}
        onClick={() => setLocale('en-US')}
      >
        ENG
      </Button>
      <Button
        size="xs"
        rounded="lg"
        variant="brand"
        fontSize="10px"
        color="secondary.500"
        isActive={isArabic}
        onClick={() => setLocale('ar-EG')}
      >
        عربى
      </Button>
    </Flex>
  );
};
