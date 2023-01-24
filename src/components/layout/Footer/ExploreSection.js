import { useContext, useState } from 'react';
import { Flex, Text, Button, useDisclosure } from '@chakra-ui/react';

import { Modal } from '../../UI/Modal';
import { AuthContext } from '../../../store/AuthContext';

export const ExploreSection = () => {
  const [modalData, setModalData] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { token } = useContext(AuthContext);
  const { footer, closeBtn, privacy, termsConditions } = token.translation;

  const handleClick = data => {
    onOpen();
    setModalData(data);
  };

  const modalFooter = (
    <Button variant="outline" colorScheme="brand" onClick={onClose}>
      {closeBtn}
    </Button>
  );

  return (
    <>
      <Modal
        {...modalData}
        isOpen={isOpen}
        onClose={onClose}
        footer={modalFooter}
        size="lg"
      />

      <Flex flexDir="column" gap={3} align={{ base: 'center', md: 'start' }}>
        <Text fontSize="md" fontWeight="bold">
          {footer.explore}
        </Text>
        <Flex flexDir="column" gap={2}>
          <Button
            variant="link"
            color="current"
            fontSize="xs"
            fontWeight="bold"
            onClick={() => handleClick({ header: footer.ourPromise })}
          >
            {footer.ourPromise}
          </Button>
          <Button
            variant="link"
            color="current"
            fontSize="xs"
            fontWeight="bold"
            onClick={() => handleClick({ header: footer['about-us'] })}
          >
            {footer['about-us']}
          </Button>
          <Button
            variant="link"
            color="current"
            fontSize="xs"
            fontWeight="bold"
            onClick={() =>
              handleClick({ header: footer.policy, body: privacy })
            }
          >
            {footer.policy}
          </Button>
          <Button
            variant="link"
            color="current"
            fontSize="xs"
            fontWeight="bold"
            onClick={() =>
              handleClick({
                header: footer.conditions,
                body: termsConditions,
              })
            }
          >
            {footer.conditions}
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
