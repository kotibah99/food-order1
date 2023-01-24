import { useContext } from 'react';
import { Text, VStack, Heading, Flex } from '@chakra-ui/react';

import { ChangePassword } from './ChangePassword';
import { AuthContext } from '../../store/AuthContext';
import { EditName } from './EditName';
import { EditMail } from './EditMail';

const Profile = () => {
  const { token } = useContext(AuthContext);
  const { title, text } = token.translation.edit.profile;

  return (
    <Flex flexDir="column" px={{ base: 2, md: 5 }} mt={5}>
      <Heading size="xl">{title}</Heading>
      <Text>{text}</Text>
      <VStack p={3} my={3} spacing={10} rounded="md" bg="gray.50">
        <EditName />
        <EditMail />
        <ChangePassword />
      </VStack>
    </Flex>
  );
};

export default Profile;
