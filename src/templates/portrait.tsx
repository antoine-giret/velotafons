import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import { HeadProps, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { IoBusinessOutline } from 'react-icons/io5';
import showdown from 'showdown';

import { Breadcrumb, CommonHead } from '../components';
import { useHead } from '../hooks';

const converter = new showdown.Converter({ simpleLineBreaks: true });

function PortraitTemplate({
  data: { datoCmsPortrait },
}: HeadProps<Queries.PortraitQuery>): JSX.Element {
  if (!datoCmsPortrait) return <></>;

  const { pseudo, city, publicationDate, picture, presentation, bikes, equipment } =
    datoCmsPortrait;
  const image = picture && getImage(picture);

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
            { key: 'portraits', to: '/blog?tags=portraits', label: 'Portaits de vélotafeurs' },
          ]}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Heading as="h1" fontSize="3xl" fontWeight={700}>
            Le portrait de {pseudo}
          </Heading>
          {city && (
            <Box alignItems="center" display="flex" flexDirection="row" gap={1}>
              <Icon as={IoBusinessOutline} color="grey" />
              <Text color="grey" fontSize="sm">
                {city}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      <Box display="flex" flexDirection={['column', 'column', 'row']} gap={5}>
        {image && (
          <Box
            border="1px solid #eee"
            borderRadius="8px"
            flexShrink={0}
            overflow="hidden"
            width={['100%', '100%', 300]}
          >
            <GatsbyImage alt={picture.alt || ''} image={image} objectFit="cover" />
          </Box>
        )}
        {presentation && (
          <Box flexShrink={0} width={['100%', '100%', 'calc(100% - 340px)']}>
            <Text as="div" dangerouslySetInnerHTML={{ __html: converter.makeHtml(presentation) }} />
          </Box>
        )}
      </Box>
      {bikes && bikes.length > 0 && (
        <Box as="section" display="flex" flexDirection="column" gap={3}>
          <Heading as="h2" fontSize="2xl" fontWeight={700}>
            {bikes.length > 1 ? 'Ses vélos' : 'Son vélo'}
          </Heading>
          <Box display="flex" flexWrap="wrap" gap={3}>
            {bikes.map(
              (bike) =>
                bike && (
                  <Box key={bike.id} width={['100%', '100%', 'calc((100% - 24px) / 2)']}>
                    <BikeCard data={bike} />
                  </Box>
                ),
            )}
          </Box>
        </Box>
      )}
      {equipment && (
        <Box as="section" display="flex" flexDirection="column" gap={3}>
          <Heading as="h2" fontSize="2xl" fontWeight={700}>
            Son équipement
          </Heading>
          <Box marginLeft={3}>
            <Text as="div" dangerouslySetInnerHTML={{ __html: converter.makeHtml(equipment) }} />
          </Box>
        </Box>
      )}
      {publicationDate && (
        <Box marginTop={5}>
          <Text color="grey" fontSize="sm">
            Portrait publié le{' '}
            {new Intl.DateTimeFormat('fr-FR', {
              dateStyle: 'medium',
            }).format(new Date(publicationDate))}
          </Text>
        </Box>
      )}
    </Box>
  );
}

function BikeCard({
  data: { name, description, photo },
}: {
  data: Queries.BikeFragment;
}): JSX.Element {
  const image = photo && getImage(photo);

  return (
    <Box
      border="1px solid #eee"
      borderRadius="16px"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      width="100%"
    >
      {image && (
        <Box flexShrink={0} overflow="hidden">
          <GatsbyImage alt={photo.alt || ''} image={image} objectFit="cover" />
        </Box>
      )}
      <Box display="flex" flexDirection="column" flexGrow={1} gap={1} padding={3}>
        <Heading as="h3" fontSize="lg" fontWeight={700}>
          {name}
        </Heading>
        {description && (
          <Text as="div" dangerouslySetInnerHTML={{ __html: converter.makeHtml(description) }} />
        )}
      </Box>
    </Box>
  );
}

export default PortraitTemplate;

export function Head({
  pageContext: { slug },
  data: { site, datoCmsPortrait },
}: HeadProps<Queries.PortraitQuery, { slug: string }>) {
  const { title, description, url } = useHead({
    data: {
      title: `${datoCmsPortrait?.pseudo} vélotafe`,
      description: datoCmsPortrait?.presentation,
    },
    site,
  });
  const imageUrl = datoCmsPortrait?.picture?.url;

  return (
    <CommonHead
      description={description}
      imageUrl={imageUrl}
      title={title}
      url={`${url}/portraits/${slug}`}
    />
  );
}

export const query = graphql`
  fragment Bike on DatoCmsBike {
    id
    name
    description
    photo {
      alt
      gatsbyImageData(aspectRatio: 1.6, width: 768)
    }
  }
  query Portrait($slug: String!) {
    site {
      ...GatsbySite
    }
    datoCmsPortrait(slug: { eq: $slug }) {
      slug
      pseudo
      publicationDate
      city
      presentation
      picture {
        gatsbyImageData(aspectRatio: 1, width: 768)
        alt
        url
      }
      bikes {
        ...Bike
      }
      equipment
    }
  }
`;
