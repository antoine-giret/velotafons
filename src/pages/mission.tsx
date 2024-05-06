import { HeadProps, PageProps, graphql } from 'gatsby';
import React from 'react';

import { useContent, useHead } from '../hooks';

function MissionPage({ data: { datoCmsMission } }: PageProps<Queries.MissionQuery>): JSX.Element {
  const { elements } = useContent({ data: datoCmsMission });

  if (!datoCmsMission) return <></>;

  return <>{elements?.map(({ Ele, data }) => <Ele data={data} key={data.id} />)}</>;
}

export default MissionPage;

export function Head({ data: { site, datoCmsMission } }: HeadProps<Queries.MissionQuery>) {
  const { title, description, url, imageUrl } = useHead({ data: datoCmsMission, site });

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
      ...GatsbySite
    }
    datoCmsMission {
      ...MissionQuery
    }
  }
`;
