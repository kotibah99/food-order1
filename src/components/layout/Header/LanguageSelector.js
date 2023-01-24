import React, { useContext, useEffect } from 'react';
import { Button, Stack, useDisclosure } from '@chakra-ui/react';

import { AuthContext } from '../../../store/AuthContext';
import { Modal } from '../../UI/Modal';
import { Icon } from '../../UI/Icons';

export const LanguageSelector = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { lang, setLocale } = useContext(AuthContext);
  const isArabic = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic, lang]);

  const body = (
    <Stack>
      <Button
        onClick={() => {
          setLocale('ar-EG');
          onClose();
        }}
      >
        عربى
      </Button>
      <Button
        onClick={() => {
          setLocale('en-US');
          onClose();
        }}
      >
        English
      </Button>
    </Stack>
  );

  return (
    <>
      <Modal body={body} isOpen={isOpen} onClose={onClose} size="xs" />
      <Button
        rounded="none"
        color="black"
        variant="outline"
        onClick={onOpen}
        colorScheme="blackAlpha"
        leftIcon={<Icon name="language" boxSize={5} />}
      >
        {isArabic ? 'عربى' : 'English'}
      </Button>
    </>
  );
};
