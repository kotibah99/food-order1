import { Formik, Form } from 'formik';
import React, { useContext, useState } from 'react';
import { Button, Flex, Spacer, Stack, useDisclosure } from '@chakra-ui/react';

import { AuthContext } from '../../store/AuthContext';
import { AlertModal } from '../../components/UI/AlertModal';
import useMutateData from '../../hooks/useMutateData';
import CustomInput from '../../components/form/CustomInput';
import { PATH } from '../../data/constants';
import { useDispatch } from 'react-redux';
import { CartActions } from '../../store/CartSlice';

export const DeleteAccount = () => {
  const { token, logout } = useContext(AuthContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { isLoading, request } = useMutateData({ key: 'user' });

  const { deleteBtn, closeBtn } = token.translation;
  const { delAccBtn, btnLoadingText } = token.translation;
  const { modalHeaderText } = token.translation.edit.security;
  const { text, placeholder } = token.translation.user.password;

  const deleteAccountHandler = value => {
    const config = {
      url: `${PATH.USER}/${token.user.id}`,
      method: 'delete',
      data: { ...value },
    };

    request(config).then(() => {
      logout();
      onClose();
      dispatch(CartActions.clearCart());
    });
  };

  const modalBody = (
    <Formik initialValues={{ password: '' }} onSubmit={deleteAccountHandler}>
      <Form>
        <Stack align="end">
          <CustomInput
            label={text}
            type="password"
            name="password"
            placeholder={placeholder}
            validate={value => setIsDisabled(!value)}
          />
          <Spacer />
          <Flex gap={2} align="end">
            <Button variant="outline" colorScheme="brand" onClick={onClose}>
              {closeBtn}
            </Button>
            <Button
              type="submit"
              colorScheme="red"
              isLoading={isLoading}
              isDisabled={isDisabled}
              loadingText={btnLoadingText}
            >
              {deleteBtn}
            </Button>
          </Flex>
        </Stack>
      </Form>
    </Formik>
  );

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={onClose}
        body={modalBody}
        header={modalHeaderText}
      />
      <Button size="sm" variant="link" colorScheme="red" onClick={onOpen}>
        {delAccBtn}
      </Button>
    </>
  );
};
