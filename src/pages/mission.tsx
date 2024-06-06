import { HeadProps, PageProps, graphql } from 'gatsby';
import React from 'react';

import { CommonHead } from '../components';
import { useContent, useHead } from '../hooks';

function MissionPage({ data: { datoCmsMission } }: PageProps<Queries.MissionQuery>): JSX.Element {
  const { elements } = useContent({ data: datoCmsMission });

  if (!datoCmsMission) return <></>;

  return <>{elements?.map(({ Ele, data }) => <Ele data={data} key={data.id} />)}</>;
}

export default MissionPage;

export function Head({ data: { site, datoCmsMission } }: HeadProps<Queries.MissionQuery>) {
  const { title, description, url } = useHead({
    data: { title: datoCmsMission?.hero?.title, description: datoCmsMission?.hero?.subtitle },
    site,
  });
  const imageUrl = datoCmsMission?.metaImage?.url || datoCmsMission?.hero?.backgroundImage?.url;

  return (
    <CommonHead
      description={description}
      imageUrl={imageUrl}
      title={title}
      url={`${url}/mission`}
    />
  );
}

export const query = graphql`
  fragment MissionQuery on DatoCmsMission {
    metaImage {
      url
    }
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
