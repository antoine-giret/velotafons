import { Box, Icon, Text } from '@chakra-ui/react';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { IoMap, IoToday } from 'react-icons/io5';
import showdown from 'showdown';

import { Card } from './card';

const converter = new showdown.Converter({ simpleLineBreaks: true });

export function EventCard({ data }: { data: Queries.BlogHubEventFragment }): JSX.Element {
  if (!data) return <></>;

  const { slug, title, startDate, endDate, location, description, image: _image } = data;
  const image = _image && getImage(_image);
  if (!title || !image) return <></>;

  return (
    <Card
      description={description ? converter.makeHtml(description) : undefined}
      image={image}
      imageAlt={_image.alt || ''}
      imageFocalPoint={_image.focalPoint}
      imagePosition="top"
      key={slug}
      subtitle={
        <>
          {startDate && (
            <Box alignItems="center" display="flex" flexDirection="row" gap={1}>
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
            <Box alignItems="center" display="flex" flexDirection="row" gap={1}>
              <Icon as={IoMap} color="primary.500" fontSize="sm" />
              <Text color="grey" fontSize="sm">
                {location}
              </Text>
            </Box>
          )}
        </>
      }
      tag="Évènements"
      title={title}
      variant="outlined"
    />
  );
}
