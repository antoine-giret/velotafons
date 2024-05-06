import { HeadProps, PageProps, graphql } from 'gatsby';
import React from 'react';

import { useContent } from '../hooks';

function MissionPage({ data: { datoCmsMission } }: PageProps<Queries.MissionQuery>): JSX.Element {
  const { elements } = useContent({ data: datoCmsMission });

  if (!datoCmsMission) return <></>;

  return <>{elements?.map(({ Ele, data }) => <Ele data={data} key={data.id} />)}</>;
}

export default MissionPage;

export function Head({ data: { site, datoCmsMission } }: HeadProps<Queries.MissionQuery>) {
  const title = [datoCmsMission?.hero?.title, 'Vélotafons !'].filter(Boolean).join(' | ');
  const _description = datoCmsMission?.hero?.subtitle;
  const description =
    _description && _description.length > 160
      ? `${_description.substring(0, 157)}...`
      : _description;
  const url = site?.siteMetadata?.siteUrl;
  const imageUrl = datoCmsMission?.hero?.backgroundImage?.url;

  return (
    <>
      <title>{title}</title>
      {description && <meta content={description} name="description" />}
      <meta content={title} property="og:title" />
      {description && <meta content={description} property="og:description" />}
      <meta content="website" property="og:type" />
      {url && <meta content={`${url}/mission`} property="og:url" />}
      {imageUrl && <meta content={imageUrl} property="og:image" />}
    </>
  );
}

export const query = graphql`
  fragment MissionQuery on DatoCmsMission {
    hero {
      ...Hero
    }
    keyNumbersBlock {
      ...KeyNumbers
    }
    pillars {
      ...Cards
    }
  }
  query Mission {
    site {
      siteMetadata {
        siteUrl
      }
    }
    datoCmsMission {
      ...MissionQuery
    }
  }
`;
