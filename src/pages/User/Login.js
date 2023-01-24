import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { Button, VStack } from '@chakra-ui/react';

import { VALIDATE_EMAIL, VALIDATE_PASSWORD } from '../../utils/validations';
import { AuthContext } from '../../store/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import CustomInput from '../../components/form/CustomInput';
import { PATH } from '../../data/constants';

export const Login = () => {
  const { token, login } = useContext(AuthContext);
  const { isLoading, request } = useMutateData({ key: 'user' });

  const { email, password, login: loginBtn } = token.translation.user;
  const { btnLoadingText } = token.translation;

  const formSubmitHandler = enteredValues => {
    const config = {
      method: 'post',
      data: enteredValues,
      url: `${PATH.USER}/login`,
    };

    request(config).then(data => login(data));
  };

  return (
    <VStack>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={formSubmitHandler}
      >
        <Form>
          <VStack w={{ base: '290px', md: '500px' }} spacing={5}>
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
              {loginBtn}
            </Button>
          </VStack>
        </Form>
      </Formik>
    </VStack>
  );
};
