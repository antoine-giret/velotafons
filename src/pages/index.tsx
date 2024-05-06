import type { HeadProps, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import React from 'react';

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
  const imageUrl = datoCmsHome?.hero?.backgroundImage?.url;

  return (
    <>
      <title>Vélotafons !</title>
      {description && <meta content={description} name="description" />}
      <meta content="Vélotafons !" property="og:title" />
      {description && <meta content={description} property="og:description" />}
      <meta content="website" property="og:type" />
      {url && <meta content={url} property="og:url" />}
      {imageUrl && <meta content={imageUrl} property="og:image" />}
    </>
  );
}

export const query = graphql`
  fragment GatsbySite on Site {
    siteMetadata {
      siteUrl
    }
  }
  fragment HomeQuery on DatoCmsHome {
    hero {
      ...Hero
    }
    keyNumbersBlock {
      ...KeyNumbers
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
