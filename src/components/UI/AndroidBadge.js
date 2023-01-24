import { useContext } from 'react';

import badge from '../../assets/google-play-badge.png';
import badgeAR from '../../assets/google-play-badge-AR.png';
import { AuthContext } from '../../store/AuthContext';
import { ImagePreview } from './ImagePreview';

export const AndroidBadge = props => {
  const { token } = useContext(AuthContext);
  const isArabic = token.locale === 'ar-EG';

  return (
    <ImagePreview
      w="150px"
      ratio={3 / 1}
      cursor="pointer"
      alt="google-play-badge"
      src={isArabic ? badgeAR : badge}
      _hover={{ opacity: '75%', transition: 'opacity 250ms ease-in-out 0s' }}
      {...props}
    />
  );
};
