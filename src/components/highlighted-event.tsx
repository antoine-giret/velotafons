import { Box, Icon, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { IoLocation, IoToday } from 'react-icons/io5';
import showdown from 'showdown';

import { Card } from './card';
import { Links } from './links';

const converter = new showdown.Converter({ simpleLineBreaks: true });

function HighlightedEvent({
  data: { event, imagePosition, discoverButtonText, links },
}: {
  data: Queries.HighlightedEventFragment;
}): JSX.Element {
  if (!event) return <></>;

  const { slug, title, startDate, endDate, location, image: _image, description } = event;
  const image = _image && getImage(_image);
  if (!image) return <></>;

  return (
    <Card
      actions={
        links && (
          <Links
            links={[
              ...(discoverButtonText
                ? [
                    {
                      id: 'discover',
                      label: discoverButtonText,
                      to: `/blog/evenements/${slug}`,
                      variant: 'solid',
                    },
                  ]
                : []),
              ...links,
            ]}
          />
        )
      }
      description={description ? converter.makeHtml(description) : undefined}
      image={image}
      imageAlt={_image.alt || ''}
      imageFocalPoint={_image.focalPoint}
      imagePosition={imagePosition === 'right' ? 'right' : 'left'}
      key={slug}
      subtitle={
        <Box display="flex" flexDirection="column" gap={1}>
          {startDate && (
            <Box alignItems="center" display="flex" gap={1}>
              <Icon as={IoToday} color="primary.500" fontSize="sm" />
              <Text color="grey" fontSize="sm">
                {endDate
                  ? `Du ${new Intl.DateTimeFormat('fr-FR', {
                      dateStyle: 'medium',
                    }).format(new Date(startDate))} au ${new Intl.DateTimeFormat('fr-FR', {
                      dateStyle: 'medium',
                    }).format(new Date(endDate))}`
                  : `${new Intl.DateTimeFormat('fr-FR', {
                      dateStyle: 'medium',
                      timeStyle: 'medium',
                    }).format(new Date(startDate))}`}
              </Text>
            </Box>
          )}
          {location && (
            <Box alignItems="center" display="flex" gap={1}>
              <Icon as={IoLocation} color="primary.500" fontSize="sm" />
              <Text color="grey" fontSize="sm">
                {location}
              </Text>
            </Box>
          )}
        </Box>
      }
      tag="Évènements"
      title={title || ''}
    />
  );
}

export default HighlightedEvent;

export const query = graphql`
  fragment HighlightedEvent on DatoCmsHighlightedEvent {
    id
    internal {
      type
    }
    event {
      slug
      title
      startDate(locale: "fr")
      endDate(locale: "fr")
      location
      image {
        gatsbyImageData(aspectRatio: 1, width: 688)
        focalPoint {
          x
          y
        }
        alt
      }
      description
    }
    imagePosition
    discoverButtonText
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
