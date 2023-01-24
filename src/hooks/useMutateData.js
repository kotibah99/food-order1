import { useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { PATH } from '../data/constants';
import { client } from '../utils/axios-utils';

const queryFn = Object.freeze({
  cart: options => client({ url: `ar/${PATH.CART}`, ...options }),
  user: options => client({ url: PATH.USER, ...options }),
  order: options => client({ url: `ar/${PATH.ORDER}`, ...options }),
  address: options => client({ url: PATH.ADDRESS, ...options }),
});

export const useMutateData = ({ key }) => {
  const toast = useToast();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    async options => {
      if (!options) return;

      setIsLoading(true);
      try {
        const response = await queryFn[key](options);
        return response.data;
      } catch (err) {
        const message = err?.response?.data?.message || err.message;
        toast({
          title: 'Failed',
          description: message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        setError(message);
        throw new Error(message || 'something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
    [key, toast]
  );

  return {
    error,
    isLoading,
    request,
  };
};

export default useMutateData;
