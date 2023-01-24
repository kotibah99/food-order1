import {
  Radio,
  HStack,
  FormLabel,
  RadioGroup,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const RadioSelection = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error} isRequired>
      <FormLabel>{label}</FormLabel>
      <RadioGroup defaultValue={options[0]} {...field}>
        <HStack spacing={6}>
          {options.map((option, idx) => (
            <Field as={Radio} key={idx} value={option}>
              {option}
            </Field>
          ))}
        </HStack>
      </RadioGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default RadioSelection;
