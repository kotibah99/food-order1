import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { VStack, Button, useToast } from '@chakra-ui/react';

import {
  PHONE_NUMBER,
  VALIDATE_TEXT,
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from '../../utils/validations';
import { AuthContext } from '../../store/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import CustomInput from '../../components/form/CustomInput';

export const Register = () => {
  const toast = useToast();
  const { token } = useContext(AuthContext);
  const { isLoading, request } = useMutateData({ key: 'user' });

  const { btnLoadingText } = token.translation;
  const { fullname, phone, email, password, register } = token.translation.user;

  const formSubmitHandler = (enteredValues, actions) => {
    const config = {
      method: 'post',
      data: enteredValues,
    };
    request(config).then(() => {
      toast({
        title: 'Success',
        description: "We've created an account for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      actions.resetForm();
    });
  };

  return (
    <VStack>
      <Formik
        initialValues={{ fullname: '', phone: '', email: '', password: '' }}
        onSubmit={formSubmitHandler}
      >
        <Form>
          <VStack w={{ base: '290px', md: '500px' }} spacing={5}>
            <CustomInput
              type="text"
              name="fullname"
              label={fullname.text}
              placeholder={fullname.placeholder}
              validate={VALIDATE_TEXT}
            />
            <CustomInput
              type="phone"
              name="phone"
              label={phone.text}
              placeholder={phone.placeholder}
              validate={PHONE_NUMBER}
            />
            <CustomInput
              type="email"
              name="email"
              label={email.text}
              placeholder={email.placeholder}
              validate={VALIDATE_EMAIL}
            />
            <CustomInput
              type="password"
              name="password"
              label={password.text}
              placeholder={password.placeholder}
              validate={VALIDATE_PASSWORD}
            />
            <Button
              type="submit"
              variant="brand"
              isLoading={isLoading}
              loadingText={btnLoadingText}
              spinnerPlacement="end"
            >
              {register}
            </Button>
          </VStack>
        </Form>
      </Formik>
    </VStack>
  );
};
