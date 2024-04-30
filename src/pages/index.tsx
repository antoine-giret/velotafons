import type { HeadProps, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import * as React from 'react';

import { useContent } from '../hooks';

function IndexPage({ data: { datoCmsHome } }: PageProps<Queries.HomeQuery>) {
  const { elements } = useContent({ data: datoCmsHome });

  if (!datoCmsHome) return <></>;

  return <>{elements?.map(({ Ele, data }) => <Ele data={data} key={data.id} />)}</>;
}

export default IndexPage;

export function Head({}: HeadProps) {
  return <title>Vélotafons !</title>;
}

export const query = graphql`
  fragment HomeQuery on DatoCmsHome {
    hero {
      ...Hero
    }
    keyNumbersBlock {
      ...KeyNumbers
    }
  }
  query Home {
    datoCmsHome {
      ...HomeQuery
    }
  }
`;
