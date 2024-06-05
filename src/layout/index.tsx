import { Box } from '@chakra-ui/react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import React, { useEffect, useState } from 'react';

import Footer from './footer';
import Header from './header';
import NewsletterModal from './newsletter-modal';

function Layout({ element }: WrapPageElementBrowserArgs): JSX.Element {
  const [initialized, setInitialized] = useState(false);
  const [newsletterModalOpen, toggleNewsletterModal] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized && typeof window !== 'undefined') {
      try {
        const newsletterModalAlreadyDisplayed = localStorage.getItem('newsletterModalDisplayed');
        if (newsletterModalAlreadyDisplayed !== 'true') toggleNewsletterModal(true);
      } catch (err) {
        console.error(err);
      }
    }
  }, [initialized]);

  return (
    <>
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
        <Box
          as="main"
          display="flex"
          flexDirection="column"
          flexGrow={1}
          gap={[5, 8, 8]}
          paddingBottom={5}
        >
          {element}
        </Box>
        <Footer />
      </Box>
      <NewsletterModal onClose={() => toggleNewsletterModal(false)} open={newsletterModalOpen} />
    </>
  );
}

export default Layout;
