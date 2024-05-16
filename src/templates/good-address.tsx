import { HeadProps, graphql } from 'gatsby';
import React from 'react';

import { CommonHead } from '../components';
import { useHead } from '../hooks';

function GoodAddressTemplate(): JSX.Element {
  return <></>;
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
        gatsbyImageData(aspectRatio: 1.6, width: 1000)
        alt
        url
      }
    }
  }
`;
