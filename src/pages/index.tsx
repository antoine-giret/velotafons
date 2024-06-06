import type { HeadProps, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import React from 'react';

import { CommonHead } from '../components';
import { useContent } from '../hooks';

function IndexPage({ data: { datoCmsHome } }: PageProps<Queries.HomeQuery>) {
  const { elements } = useContent({ data: datoCmsHome });

  if (!datoCmsHome) return <></>;

  return <>{elements?.map(({ Ele, data }) => <Ele data={data} key={data.id} />)}</>;
}

export default IndexPage;

export function Head({ data: { site, datoCmsHome } }: HeadProps<Queries.HomeQuery>) {
  const _description = datoCmsHome?.hero?.subtitle;
  const description =
    _description && _description.length > 160
      ? `${_description.substring(0, 157)}...`
      : _description;
  const url = site?.siteMetadata?.siteUrl;
  const imageUrl = datoCmsHome?.metaImage?.url || datoCmsHome?.hero?.backgroundImage?.url;

  return (
    <CommonHead
      description={description}
      imageUrl={imageUrl}
      title="Vélotafons !"
      url={url || ''}
    />
  );
}

export const query = graphql`
  fragment GatsbySite on Site {
    siteMetadata {
      siteUrl
    }
  }
  fragment HomeQuery on DatoCmsHome {
    metaImage {
      url
    }
    hero {
      ...Hero
    }
    keyNumbersBlock {
      ...KeyNumbers
    }
    highlightedIllustration {
      ...HighlightedIllustration
    }
    highlightedPortrait {
      ...HighlightedPortrait
    }
    goodAddresses {
      ...ImageCard
    }
    highlightedEvent {
      ...HighlightedEvent
    }
  }
  query Home {
    site {
      ...GatsbySite
    }
    datoCmsHome {
      ...HomeQuery
    }
  }
`;
