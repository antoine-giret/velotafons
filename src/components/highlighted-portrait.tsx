import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import showdown from 'showdown';

import { Card } from './card';
import { Links } from './links';

const converter = new showdown.Converter();

function HighlightedPortrait({
  data: { portrait, imagePosition, links },
}: {
  data: Queries.HighlightedPortraitFragment;
}): JSX.Element {
  if (!portrait) return <></>;

  const { slug, picture, pseudo, presentation } = portrait;
  const image = picture && getImage(picture);
  if (!image) return <></>;

  return (
    <Card
      actions={links && <Links links={links} />}
      description={presentation ? converter.makeHtml(presentation) : undefined}
      image={image}
      imageAlt={picture.alt || ''}
      imagePosition={imagePosition === 'right' ? 'right' : 'left'}
      key={slug}
      tag="Portraits de vélotafeurs"
      title={`${pseudo} vélotafe !`}
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
