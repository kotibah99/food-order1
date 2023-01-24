import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import React, { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';

export const Drawer = ({ header, body, footer, isOpen, onClose }) => {
  const btnRef = React.useRef();
  const { lang } = useContext(AuthContext);

  const isArabic = lang === 'ar';
  const placement = isArabic ? 'right' : 'left';

  return (
    <ChakraDrawer
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={btnRef}
      placement={placement}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          top={2}
          left={isArabic ? 3 : ''}
          right={isArabic ? '' : 3}
        />
        <DrawerHeader>{header}</DrawerHeader>
        <DrawerBody>{body}</DrawerBody>
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
};
