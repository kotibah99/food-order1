import { useContext } from 'react';
import { Form, Formik } from 'formik';
import {
  Stack,
  Button,
  HStack,
  Divider,
  Heading,
  Container,
} from '@chakra-ui/react';

import { VALIDATE_PASSWORD } from '../../utils/validations';
import { DeleteAccount } from './DeleteAccount';
import { AuthContext } from '../../store/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import CustomInput from '../../components/form/CustomInput';
import { PATH } from '../../data/constants';

export const ChangePassword = () => {
  const { token, login } = useContext(AuthContext);
  const { isLoading, request } = useMutateData({ key: 'user' });

  const { confirmBtn, btnLoadingText } = token.translation;
  const { title, old, newPass, confirm } = token.translation.edit.security;

  const changePasswordHandler = values => {
    const config = {
      url: `${PATH.USER}/${token.user.id}`,
      method: 'put',
      data: {
        ...token.user,
        password: values.confirmPassword,
      },
    };

    request(config).then(data => login(data));
  };

  const matchOldPassword = oldPassword => {
    if (token.user.password !== oldPassword) {
      return 'Invalid Password';
    }
  };

  const matchNewPassword = values => {
    if (!values.confirmPassword) {
      return 'Required';
    }
    if (values.newPassword !== values.confirmPassword) {
      return 'Password does not match';
    }
    if (values.oldPassword === values.confirmPassword) {
      return 'Please choose different password';
    }
  };

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  return (
    <Stack w="full">
      <Heading size="md">{title}</Heading>
      <Divider />
      <Formik initialValues={initialValues} onSubmit={changePasswordHandler}>
        {({ values }) => (
          <Form>
            <Container>
              <Stack>
                <CustomInput
                  type="password"
                  name="oldPassword"
                  label={old.label}
                  placeholder={old.placeholder}
                  validate={matchOldPassword}
                />
                <CustomInput
                  type="password"
                  name="newPassword"
                  label={newPass.label}
                  placeholder={newPass.placeholder}
                  validate={VALIDATE_PASSWORD}
                />
                <CustomInput
                  type="password"
                  name="confirmPassword"
                  label={confirm.label}
                  placeholder={confirm.placeholder}
                  validate={() => matchNewPassword(values)}
                />
                <HStack w="full">
                  <Button
                    type="submit"
                    variant="brand"
                    isLoading={isLoading}
                    spinnerPlacement="end"
                    loadingText={btnLoadingText}
                  >
                    {confirmBtn}
                  </Button>
                  <DeleteAccount />
                </HStack>
              </Stack>
            </Container>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
