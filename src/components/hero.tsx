import { Box, Heading, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import showdown from 'showdown';

import { Links } from './links';

const converter = new showdown.Converter({ simpleLineBreaks: true });

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
            objectPosition={
              _backgroundImage.focalPoint
                ? `${_backgroundImage.focalPoint.x * 100}% ${_backgroundImage.focalPoint.y * 100}%`
                : '50% 50%'
            }
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
        paddingY={height === 'fill_view' ? 12 : 8}
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
            as="div"
            color={backgroundImage ? '#fff' : undefined}
            dangerouslySetInnerHTML={{ __html: converter.makeHtml(subtitle) }}
            fontSize="lg"
            textAlign={align === 'center' ? 'center' : 'left'}
          />
        )}
        {links && <Links links={links} size="lg" />}
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
  fragment ExternalLink on DatoCmsExternalLink {
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
      focalPoint {
        x
        y
      }
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
      ... on DatoCmsExternalLink {
        ...ExternalLink
      }
    }
  }
`;
