import { Box } from '@chakra-ui/react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import React from 'react';

import Footer from './footer';
import Header from './header';

function Layout({}: WrapPageElementBrowserArgs): JSX.Element {
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
      <Box flexGrow={1} />
      <Footer />
    </Box>
  );
}

export default Layout;
