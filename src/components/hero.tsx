import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link, graphql } from 'gatsby';
import React from 'react';

function Hero({
  data: { align, height, title, subtitle, links },
}: {
  data: Queries.HeroFragment;
}): JSX.Element {
  return (
    <Box
      alignItems={align === 'center' ? 'center' : 'flex-start'}
      display="flex"
      flexDirection="column"
      gap={3}
      justifyContent="center"
      paddingX={[4, 4, 8]}
      paddingY={12}
      sx={
        height === 'fill_view'
          ? {
              minHeight: 'calc(100vh - 54px)',
              '&': { minHeight: 'calc(100dvh - 54px)' },
            }
          : {}
      }
    >
      <Heading
        as="h1"
        fontSize="3xl"
        fontWeight={700}
        textAlign={align === 'center' ? 'center' : 'left'}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text fontSize="lg" textAlign={align === 'center' ? 'center' : 'left'}>
          {subtitle}
        </Text>
      )}
      {links && links.length > 0 && (
        <Box alignItems="center" display="flex" gap={3}>
          {links.map(
            (link) =>
              link && (
                <Button as={Link} colorScheme="primary" key={link.id} size="md" to={link.to || '/'}>
                  {link.label}
                </Button>
              ),
          )}
        </Box>
      )}
    </Box>
  );
}

export default Hero;

export const query = graphql`
  fragment Hero on DatoCmsHero {
    title
    subtitle
    height
    align
    links {
      id
      label
      to
    }
  }
`;
