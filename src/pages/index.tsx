import type { HeadProps, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import * as React from 'react';

import Hero from '../components/hero';

function IndexPage({ data: { datoCmsHome } }: PageProps<Queries.HomeQuery>) {
  if (!datoCmsHome) return <></>;

  const { hero } = datoCmsHome;

  return <>{hero && <Hero data={hero} />}</>;
}

export default IndexPage;

export function Head({}: HeadProps) {
  return <title>Vélotafons !</title>;
}

export const query = graphql`
  query Home {
    datoCmsHome {
      hero {
        ...Hero
      }
    }
  }
`;
