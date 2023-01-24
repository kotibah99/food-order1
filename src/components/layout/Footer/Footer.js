import { GridItem, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';

import { LogoSection } from './LogoSection';
import { ExploreSection } from './ExploreSection';
import { FeaturesSection } from './FeaturesSection';
import { ComunicationSection } from './ComunicationSection';

export const Footer = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  return (
    <SimpleGrid
      as="footer"
      px={2}
      py={5}
      minH="175px"
      columns={4}
      justifyItems="center"
      gap={{ base: 10, md: 0 }}
      bg="secondary.50"
    >
      <GridItem colSpan={colSpan}>
        <LogoSection />
      </GridItem>
      <GridItem colSpan={colSpan}>
        <ExploreSection />
      </GridItem>
      <GridItem colSpan={colSpan}>
        <ComunicationSection />
      </GridItem>
      <GridItem colSpan={colSpan}>
        <FeaturesSection />
      </GridItem>
    </SimpleGrid>
  );
};
