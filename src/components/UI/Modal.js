import {
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Modal as ChakraModal,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { SCROLLBAR_STYLE } from '../../data/constants';
import { AuthContext } from '../../store/AuthContext';

export const Modal = props => {
  const { lang } = useContext(AuthContext);

  const isArabic = lang === 'ar';
  const { isOpen, onClose, header, body, footer, ...rest } = props;

  return (
    <ChakraModal
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      blockScrollOnMount={false}
      autoFocus={true}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton left={isArabic ? 3 : ''} right={isArabic ? '' : 3} />
        <ModalBody sx={SCROLLBAR_STYLE}>{body}</ModalBody>

        <ModalFooter ml={0}>{footer}</ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
