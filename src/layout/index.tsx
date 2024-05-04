import { Box } from '@chakra-ui/react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import React from 'react';

import Footer from './footer';
import Header from './header';

function Layout({ element }: WrapPageElementBrowserArgs): JSX.Element {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        minHeight: '100vh',
        '&': { minHeight: '100dvh' },
        overflowX: 'hidden',
      }}
    >
      <Header />
      <Box as="main" display="flex" flexDirection="column" flexGrow={1} gap={[5, 8, 8]}>
        {element}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
