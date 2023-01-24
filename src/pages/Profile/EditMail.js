import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { Button, Container, Divider, Heading, Stack } from '@chakra-ui/react';

import CustomInput from '../../components/form/CustomInput';
import { AuthContext } from '../../store/AuthContext';

export const EditMail = () => {
  const { token } = useContext(AuthContext);

  const { saveBtn } = token.translation;
  const { title, labelEmail, labelPassword } = token.translation.edit.email;

  const initials = {
    email: token.user.email,
    password: token.user.password,
  };

  return (
    <Stack w="full">
      <Heading size="md">{title}</Heading>
      <Divider />
      <Formik initialValues={initials}>
        <Form>
          <Container>
            <Stack>
              <CustomInput
                isDisabled
                name="email"
                type="email"
                label={labelEmail}
              />
              <CustomInput
                isDisabled
                name="password"
                type="password"
                label={labelPassword}
              />
              <Button isDisabled type="submit" variant="brand">
                {saveBtn}
              </Button>
            </Stack>
          </Container>
        </Form>
      </Formik>
    </Stack>
  );
};
