import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import { HeadProps, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { IoMapOutline, IoTodayOutline } from 'react-icons/io5';
import showdown from 'showdown';

import { Breadcrumb, CommonHead } from '../components';
import { useHead } from '../hooks';

const converter = new showdown.Converter({ simpleLineBreaks: true });

function EventTemplate({ data: { datoCmsEvent } }: HeadProps<Queries.EventQuery>): JSX.Element {
  if (!datoCmsEvent) return <></>;

  const { title, startDate, endDate, location, description, image: _image } = datoCmsEvent;
  const image = _image && getImage(_image);

  return (
    <Box
      alignSelf="center"
      display="flex"
      flexDirection="column"
      gap={5}
      maxWidth="100%"
      padding={5}
      width={1000}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Breadcrumb
          items={[
            { key: 'blog', to: '/blog', label: 'Blog' },
            { key: 'goodAddresses', to: '/blog?tags=adresses', label: 'Bonnes adresses' },
          ]}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Heading as="h1" fontSize="3xl" fontWeight={700}>
            {title}
          </Heading>
          {startDate && (
            <Box alignItems="center" display="flex" flexDirection="row" gap={1}>
              <Icon as={IoTodayOutline} color="grey" />
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
              <Icon as={IoMapOutline} color="grey" />
              <Text color="grey" fontSize="sm">
                {location}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      {image && (
        <Box
          border="1px solid #eee"
          borderRadius="8px"
          flexShrink={0}
          overflow="hidden"
          width="100%"
        >
          <GatsbyImage alt={_image.alt || ''} image={image} objectFit="cover" />
        </Box>
      )}
      {description && (
        <Text as="div" dangerouslySetInnerHTML={{ __html: converter.makeHtml(description) }} />
      )}
    </Box>
  );
}

export default EventTemplate;

export function Head({
  pageContext: { slug },
  data: { site, datoCmsEvent },
}: HeadProps<Queries.EventQuery, { slug: string }>) {
  const { title, description, url } = useHead({
    data: { title: datoCmsEvent?.title, description: datoCmsEvent?.description },
    site,
  });
  const imageUrl = datoCmsEvent?.image?.url;

  return (
    <CommonHead
      description={description}
      imageUrl={imageUrl}
      title={title}
      url={`${url}/adresses/${slug}`}
    />
  );
}

export const query = graphql`
  query Event($slug: String!) {
    site {
      ...GatsbySite
    }
    datoCmsEvent(slug: { eq: $slug }) {
      slug
      title
      startDate
      endDate
      location
      description
      image {
        originalId
        gatsbyImageData(aspectRatio: 1.6, width: 1000)
        focalPoint {
          x
          y
        }
        alt
        url
      }
    }
  }
`;
