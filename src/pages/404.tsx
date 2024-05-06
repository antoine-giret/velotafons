import { Box, Heading, Text } from '@chakra-ui/react';
import { HeadProps, PageProps } from 'gatsby';
import React from 'react';

import { Button } from '../components';

function NotFoundPage({}: PageProps) {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      flexGrow={1}
      gap={3}
      justifyContent="center"
      paddingX={3}
    >
      <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
        <Text fontSize="4xl" fontWeight={700}>
          404
        </Text>
        <Heading as="h1" fontSize="lg" textAlign="center">
          Page introuvable ou en construction
        </Heading>
      </Box>
      <Button link colorScheme="primary" to="/">
        Revenir à l'accueil
      </Button>
    </Box>
  );
}

export default NotFoundPage;

export function Head({}: HeadProps) {
  const title = 'Page introuvable | Vélotafons !';

  return <title>{title}</title>;
}
