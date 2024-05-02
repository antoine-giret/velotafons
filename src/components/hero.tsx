import { Box, Heading, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

import { Button } from './button';

function Hero({
  data: { backgroundImage: _backgroundImage, align, height, title, subtitle, links },
}: {
  data: Queries.HeroFragment;
}): JSX.Element {
  const backgroundImage = _backgroundImage && getImage(_backgroundImage);

  return (
    <Box position="relative">
      {backgroundImage && (
        <Box
          bgColor={backgroundImage.backgroundColor || undefined}
          height="100%"
          left={0}
          overflow="hidden"
          position="absolute"
          top={0}
          width="100%"
          zIndex={1}
        >
          <GatsbyImage
            alt={_backgroundImage.alt || ''}
            image={backgroundImage}
            objectFit="cover"
            style={{ height: '100%' }}
          />
        </Box>
      )}
      <Box
        alignItems={align === 'center' ? 'center' : 'flex-start'}
        bgColor={backgroundImage ? 'rgba(0, 0, 0, 0.7)' : undefined}
        display="flex"
        flexDirection="column"
        gap={3}
        justifyContent="center"
        paddingX={[4, 4, 8]}
        paddingY={12}
        position="relative"
        sx={
          height === 'fill_view'
            ? {
                minHeight: 'calc(100vh - 200px)',
                '&': { minHeight: 'calc(100svh - 200px)' },
              }
            : {}
        }
        zIndex={2}
      >
        <Heading
          as="h1"
          color={backgroundImage ? '#fff' : undefined}
          fontSize="3xl"
          fontWeight={700}
          textAlign={align === 'center' ? 'center' : 'left'}
        >
          {title}
        </Heading>
        {subtitle && (
          <Text
            color={backgroundImage ? '#fff' : undefined}
            fontSize="lg"
            textAlign={align === 'center' ? 'center' : 'left'}
          >
            {subtitle}
          </Text>
        )}
        {links && links.length > 0 && (
          <Box alignItems="center" display="flex" gap={3}>
            {links.map(
              (link) =>
                link &&
                ('to' in link ? (
                  <Button link colorScheme="primary" key={link.id} size="lg" to={link.to || '/'}>
                    {link.label}
                  </Button>
                ) : (
                  link.href && (
                    <Button
                      externalLink
                      colorScheme="primary"
                      href={link.href}
                      key={link.id}
                      size="lg"
                    >
                      {link.label}
                    </Button>
                  )
                )),
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Hero;

export const query = graphql`
  fragment Link on DatoCmsLink {
    id
    label
    to
    variant
  }
  fragment ExternalLink on DatoCmsExternalLinkCopy {
    id
    label
    href
    variant
  }
  fragment Hero on DatoCmsHero {
    id
    internal {
      type
    }
    backgroundImage {
      alt
      gatsbyImageData(layout: FULL_WIDTH, placeholder: DOMINANT_COLOR)
      url
    }
    title
    subtitle
    height
    align
    links {
      ... on DatoCmsLink {
        ...Link
      }
      ... on DatoCmsExternalLinkCopy {
        ...ExternalLink
      }
    }
  }
`;
