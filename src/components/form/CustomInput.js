import {
  Input,
  FormLabel,
  InputGroup,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, useField } from 'formik';

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel>{label || props.name}</FormLabel>
      <InputGroup>
        <Input as={Field} {...props} {...field} />
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
