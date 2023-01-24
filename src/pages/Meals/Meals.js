import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Flex, List, Skeleton, Stack, useMediaQuery } from '@chakra-ui/react';

import { useFetchById } from '../../hooks/useFetchById';
import { AuthContext } from '../../store/AuthContext';
import { MealItem } from '../../components/MealItem';
import { Navbar } from '../../components/layout/Navbar/Navbar';

const Meals = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useContext(AuthContext);
  const [isMobile] = useMediaQuery('(max-width: 905px)');
  const { isLoading, data: products } = useFetchById({
    key: 'products', // all products within categoryId
    id,
    lang,
  });

  useEffect(() => {
    const notFound = products?.length === 0;
    if (notFound) {
      navigate('/not-found', { replace: true });
    }
  }, [products, navigate]);

  return (
    <Stack mt={5} px={5}>
      {!isMobile && <Navbar />}
      <Skeleton isLoaded={!isLoading} fadeDuration={1}>
        <Flex as={List} wrap="wrap" gap={5}>
          {products?.map(item => (
            <MealItem key={item.id} item={item} />
          ))}
        </Flex>
      </Skeleton>
    </Stack>
  );
};

export default Meals;
