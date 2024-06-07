import { graphql } from 'gatsby';
import React from 'react';

import { PortraitCard } from './portrait-card';

function HighlightedPortrait({
  data: { portrait, imagePosition, discoverButtonText, links },
}: {
  data: Queries.HighlightedPortraitFragment;
}): JSX.Element {
  return (
    <PortraitCard
      data={portrait}
      imagePosition={imagePosition === 'right' ? 'right' : 'left'}
      links={
        discoverButtonText || links
          ? [
              ...(discoverButtonText
                ? [
                    {
                      id: 'discover',
                      label: discoverButtonText,
                      to: `/blog/portraits/${portrait?.slug}`,
                      variant: 'solid',
                    },
                  ]
                : []),
              ...(links ? links : []),
            ]
          : undefined
      }
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
    discoverButtonText
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
