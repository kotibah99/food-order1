import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTopWrapper = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};
