import { Box, Heading, Text } from '@chakra-ui/react';
import { HeadProps, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import showdown from 'showdown';

import { Breadcrumb, CommonHead } from '../components';
import { useHead } from '../hooks';

const converter = new showdown.Converter({ simpleLineBreaks: true });

function IllustrationTemplate({
  data: { datoCmsIllustration },
}: HeadProps<Queries.IllustrationQuery>): JSX.Element {
  if (!datoCmsIllustration) return <></>;

  const { title, publicationDate, illustration: _illustration, description } = datoCmsIllustration;
  const illustration = _illustration && getImage(_illustration);

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
            { key: 'illustrations', to: '/blog?tags=illustrations', label: 'Illustrations' },
          ]}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Heading as="h1" fontSize="3xl" fontWeight={700}>
            {title}
          </Heading>
        </Box>
      </Box>
      {illustration && (
        <Box
          border="1px solid #eee"
          borderRadius="8px"
          flexShrink={0}
          overflow="hidden"
          width="100%"
        >
          <GatsbyImage alt={_illustration.alt || ''} image={illustration} objectFit="cover" />
        </Box>
      )}
      {description && (
        <Text as="div" dangerouslySetInnerHTML={{ __html: converter.makeHtml(description) }} />
      )}
      {publicationDate && (
        <Box marginTop={5}>
          <Text color="grey" fontSize="sm">
            Illustration publiée le{' '}
            {new Intl.DateTimeFormat('fr-FR', {
              dateStyle: 'medium',
            }).format(new Date(publicationDate))}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default IllustrationTemplate;

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
  query Illustration($slug: String!) {
    site {
      ...GatsbySite
    }
    datoCmsIllustration(slug: { eq: $slug }) {
      slug
      title
      publicationDate
      description
      illustration {
        gatsbyImageData(width: 1000)
        alt
        url
      }
    }
  }
`;
