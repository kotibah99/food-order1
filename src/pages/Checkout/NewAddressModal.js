import {
  Flex,
  Button,
  GridItem,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Formik, Form } from 'formik';

import { RANGE_NUMBER, VALIDATE_TEXT } from '../../utils/validations';
import { AuthContext } from '../../store/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import CustomInput from '../../components/form/CustomInput';
import { Modal } from '../../components/UI/Modal';
import { AddressActions } from '../../store/AddressSlice';
import { useDispatch } from 'react-redux';

export const NewAddressModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const { isLoading, request } = useMutateData({ key: 'address' });

  const {
    city,
    notes,
    street,
    apartNum,
    floorNum,
    shortName,
    addressBtn,
    governorate,
    buildingNum,
  } = token.translation.addressForm;
  const { confirmBtn, closeBtn, btnLoadingText } = token.translation;

  const submitHandler = (values, actions) => {
    const config = {
      method: 'post',
      data: {
        customerId: token.user.id,
        ...values,
      },
    };

    request(config).then(data => {
      onClose();
      actions.resetForm();
      dispatch(AddressActions.addAddressToList(data));
    });
  };

  const initialValues = {
    city: '',
    notes: '',
    street: '',
    shortName: '',
    governorate: '',
    floorrUmber: '',
    buildingNumber: '',
    apartmentNumber: '',
  };

  const body = (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form>
        <SimpleGrid columns={2} gap={3}>
          <GridItem colSpan={colSpan}>
            <CustomInput
              type="number"
              name="apartmentNumber"
              label={apartNum.text}
              placeholder={apartNum.placeholder}
              validate={RANGE_NUMBER}
            />
          </GridItem>
          <GridItem colSpan={colSpan}>
            <CustomInput
              type="number"
              name="floorrUmber"
              label={floorNum.text}
              placeholder={floorNum.placeholder}
              validate={RANGE_NUMBER}
            />
          </GridItem>
          <GridItem colSpan={colSpan}>
            <CustomInput
              type="number"
              name="buildingNumber"
              label={buildingNum.text}
              placeholder={buildingNum.placeholder}
              validate={RANGE_NUMBER}
            />
          </GridItem>
          <GridItem colSpan={colSpan}>
            <CustomInput
              type="text"
              name="street"
              label={street.text}
              placeholder={street.placeholder}
              validate={VALIDATE_TEXT}
            />
          </GridItem>
          <GridItem colSpan={colSpan}>
            <CustomInput
              type="text"
              name="city"
              label={city.text}
              placeholder={city.placeholder}
              validate={VALIDATE_TEXT}
            />
          </GridItem>
          <GridItem colSpan={colSpan}>
            <CustomInput
              type="textarea"
              name="governorate"
              label={governorate.text}
              placeholder={governorate.placeholder}
              validate={VALIDATE_TEXT}
            />
          </GridItem>
          <GridItem colSpan={colSpan}>
            <CustomInput
              type="text"
              name="shortName"
              label={shortName.text}
              placeholder={shortName.placeholder}
              validate={VALIDATE_TEXT}
            />
          </GridItem>
          <GridItem colSpan={colSpan}>
            <CustomInput
              type="textarea"
              name="notes"
              label={notes.text}
              placeholder={notes.placeholder}
            />
          </GridItem>
          <GridItem>
            <Flex gap={2}>
              <Button variant="outline" colorScheme="brand" onClick={onClose}>
                {closeBtn}
              </Button>
              <Button
                type="submit"
                variant="brand"
                isLoading={isLoading}
                loadingText={btnLoadingText}
              >
                {confirmBtn}
              </Button>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Form>
    </Formik>
  );

  return (
    <Modal
      size="full"
      header={addressBtn}
      body={body}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    />
  );
};
