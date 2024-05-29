import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import { HeadProps, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { Fragment } from 'react';
import { IoLinkOutline, IoPinOutline } from 'react-icons/io5';
import showdown from 'showdown';

import { Breadcrumb, CommonHead } from '../components';
import { useHead } from '../hooks';

const converter = new showdown.Converter({ simpleLineBreaks: true });

function GoodAddressTemplate({
  data: { datoCmsGoodAddress },
}: HeadProps<Queries.GoodAddressQuery>): JSX.Element {
  if (!datoCmsGoodAddress) return <></>;

  const { title, address, website, publicationDate, photos, description } = datoCmsGoodAddress;
  const mainPhoto = photos?.[0] && getImage(photos[0]);
  const otherPhotos = photos?.slice(1);

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
          {address && (
            <Box alignItems="center" display="flex" flexDirection="row" gap={1}>
              <Icon as={IoPinOutline} color="grey" />
              <Text color="grey" fontSize="sm">
                {address}
              </Text>
            </Box>
          )}
          {website && (
            <Box alignItems="center" display="flex" flexDirection="row" gap={1}>
              <Icon as={IoLinkOutline} color="grey" />
              <Text as="a" color="grey" fontSize="sm" href={website} target="_blank">
                {website}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      {mainPhoto && (
        <Box borderRadius="8px" flexShrink={0} overflow="hidden" width="100%">
          <GatsbyImage alt={photos[0].alt || ''} image={mainPhoto} objectFit="cover" />
        </Box>
      )}
      {description && (
        <Text as="div" dangerouslySetInnerHTML={{ __html: converter.makeHtml(description) }} />
      )}
      {otherPhotos && otherPhotos.length > 0 && (
        <Box as="section" display="flex" flexDirection="column" gap={3}>
          <Heading as="h2" fontSize="2xl" fontWeight={700}>
            Quelques photos
          </Heading>
          <Box display="flex" flexWrap="wrap" gap={3}>
            {otherPhotos.map((_photo) => {
              const photo = getImage(_photo);
              if (!photo) return <Fragment key={_photo.originalId} />;

              return (
                <Box
                  key={_photo.originalId}
                  width={['100%', 'calc((100% - 24px) / 2)', 'calc((100% - 48px) / 3)']}
                >
                  <Box borderRadius="8px" flexShrink={0} overflow="hidden" width="100%">
                    <GatsbyImage alt={_photo.alt || ''} image={photo} objectFit="cover" />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
      {publicationDate && (
        <Box marginTop={5}>
          <Text color="grey" fontSize="sm">
            Bonne adresse publiée le{' '}
            {new Intl.DateTimeFormat('fr-FR', {
              dateStyle: 'medium',
            }).format(new Date(publicationDate))}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default GoodAddressTemplate;

export function Head({
  pageContext: { slug },
  data: { site, datoCmsGoodAddress },
}: HeadProps<Queries.GoodAddressQuery, { slug: string }>) {
  const { title, description, url } = useHead({
    data: { title: datoCmsGoodAddress?.title, description: datoCmsGoodAddress?.description },
    site,
  });
  const imageUrl = datoCmsGoodAddress?.photos?.[0]?.url;

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
  query GoodAddress($slug: String!) {
    site {
      ...GatsbySite
    }
    datoCmsGoodAddress(slug: { eq: $slug }) {
      slug
      title
      publicationDate
      address
      website
      description
      photos {
        originalId
        gatsbyImageData(aspectRatio: 1.6, width: 1000)
        alt
        url
      }
    }
  }
`;
