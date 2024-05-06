import { graphql } from 'gatsby';
import React from 'react';

import { PortraitCard } from './portrait-card';

function HighlightedPortrait({
  data: { portrait, imagePosition, links },
}: {
  data: Queries.HighlightedPortraitFragment;
}): JSX.Element {
  return (
    <PortraitCard
      data={portrait}
      imagePosition={imagePosition === 'right' ? 'right' : 'left'}
      links={links}
    />
  );
}

export default HighlightedPortrait;

export const query = graphql`
  fragment HighlightedPortrait on DatoCmsHighlightedPortrait {
    id
    internal {
      type
    }
    portrait {
      slug
      pseudo
      presentation
      picture {
        gatsbyImageData(aspectRatio: 1, width: 688)
        alt
      }
    }
    imagePosition
    links {
      ... on DatoCmsLink {
        ...Link
      }
      ... on DatoCmsExternalLink {
        ...ExternalLink
      }
    }
  }
`;
