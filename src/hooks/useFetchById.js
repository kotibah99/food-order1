import { useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

import { client } from '../utils/axios-utils';
import { PATH } from '../data/constants';

const queryFn = Object.freeze({
  orders: ({ id, lang }) => {
    return client({ url: `${lang}/${PATH.ORDER}/all/${id}` }); // useId
  },
  order: ({ id, lang }) => {
    return client({ url: `${lang}/${PATH.ORDER}/${id}` }); // orderId
  },

  products: ({ id, lang }) => {
    return client({ url: `${lang}/${PATH.PRODUCTS}/all/${id}` }); // userId
  },
  product: ({ id, lang }) => {
    return client({ url: `${lang}/${PATH.PRODUCTS}/${id}` }); // productId
  },

  search: ({ id, lang }) => {
    return client({ url: `${lang}/${PATH.SEARCH}/${id}` });
  },

  address: ({ id }) => {
    return client({ url: `${PATH.ADDRESS}/all/user/${id}` });
  },

  cart: ({ id, lang }) => {
    return client({ url: `${lang}/${PATH.CART}/all/${id}` });
  },

  categories: ({ id, lang }) => {
    return client({ url: `${lang}/${PATH.CATEGORY}/${id}` });
  },
});

export const useFetchById = ({ key, id, lang }) => {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await queryFn[key]({ id, lang });
      setData(response.data);
    } catch (err) {
      const message = err?.response?.data?.message || err.message;
      setError(message);

      toast({
        title: 'Failed',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  }, [key, id, lang, toast]);

  useEffect(() => {
    if (!id) return;
    request();
  }, [id, request]);

  return {
    data,
    error,
    isLoading,
  };
};
