import {
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const Selection = ({ options, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && meta.error} isRequired>
      <FormLabel>{label || props.name}</FormLabel>
      <Field
        as={Select}
        {...field}
        {...props}
        validate={(value) => (!value ? "Required" : undefined)}
      >
        {options?.map((option, idx) => (
          <option key={idx} value={option.key}>
            {option.value}
          </option>
        ))}
      </Field>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default Selection;
