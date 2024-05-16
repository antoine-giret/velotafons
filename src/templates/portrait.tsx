import { HeadProps, graphql } from 'gatsby';
import React from 'react';

import { CommonHead } from '../components';
import { useHead } from '../hooks';

function PortraitTemplate(): JSX.Element {
  return <></>;
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
  query Portrait($slug: String!) {
    site {
      ...GatsbySite
    }
    datoCmsPortrait(slug: { eq: $slug }) {
      slug
      pseudo
      publicationDate
      presentation
      picture {
        gatsbyImageData(aspectRatio: 1.6, width: 688)
        alt
        url
      }
    }
  }
`;
