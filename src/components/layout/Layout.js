import React from 'react';
import { Box, useMediaQuery } from '@chakra-ui/react';

import { ScrollToTopWrapper } from '../UI/ScrollToTopWrapper';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { MobileHeader } from './Header/MobileHeader';
import { ContentLoader } from './ContentLoader';

export const Layout = ({ children }) => {
  const [isMobile] = useMediaQuery('(max-width: 905px)');

  return (
    <ScrollToTopWrapper>
      <ContentLoader />
      {isMobile ? <MobileHeader /> : <Header />}
      <Box
        as="main"
        mb={20}
        minH="70vh"
        overflowX="hidden"
        mt={isMobile ? '0' : '70px'}
      >
        {children}
      </Box>
      <Footer />
    </ScrollToTopWrapper>
  );
};
