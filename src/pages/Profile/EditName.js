import { useContext } from 'react';
import { Form, Formik } from 'formik';
import { Button, Container, Divider, Heading, Stack } from '@chakra-ui/react';

import { VALIDATE_TEXT } from '../../utils/validations';
import { AuthContext } from '../../store/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import CustomInput from '../../components/form/CustomInput';
import { PATH } from '../../data/constants';

export const EditName = () => {
  const { token, login } = useContext(AuthContext);
  const { isLoading, request } = useMutateData({ key: 'user' });

  const { saveBtn, btnLoadingText } = token.translation;
  const { title, label } = token.translation.edit.personal;

  const editNameHandler = values => {
    const config = {
      url: `${PATH.USER}/${token.user.id}`,
      method: 'put',
      data: {
        ...token.user,
        ...values,
      },
    };

    request(config).then(data => login(data));
  };

  const initialValues = {
    fullName: token.user.fullName,
  };

  return (
    <Stack w="full">
      <Heading size="md">{title}</Heading>
      <Divider />
      <Formik initialValues={initialValues} onSubmit={editNameHandler}>
        {({ values }) => (
          <Form>
            <Container>
              <Stack>
                <CustomInput
                  type="text"
                  name="fullName"
                  label={label}
                  validate={VALIDATE_TEXT}
                />
                <Button
                  type="submit"
                  variant="brand"
                  isLoading={isLoading}
                  spinnerPlacement="end"
                  loadingText={btnLoadingText}
                  isDisabled={values.fullName === initialValues.fullName}
                >
                  {saveBtn}
                </Button>
              </Stack>
            </Container>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
