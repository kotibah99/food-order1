import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Heading, useMediaQuery } from '@chakra-ui/react';

import { Icon } from './Icons';
import { AuthContext } from '../../store/AuthContext';

export const Logo = ({ props }) => {
  const { lang } = useContext(AuthContext);
  const [isMobile] = useMediaQuery('(max-width: 905px)');

  const isArabic = lang === 'ar';

  return (
    <Link to="/" aria-label="logo">
      {isArabic ? (
        <Icon
          name="logo"
          h={isMobile ? 12 : 16}
          w={isMobile ? 24 : 32}
          {...props}
        />
      ) : (
        <Heading size={{ base: 'xl', md: '2xl' }} letterSpacing={-1}>
          RAWAA
        </Heading>
      )}
    </Link>
  );
};
