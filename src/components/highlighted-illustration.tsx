import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import showdown from 'showdown';

import { Card } from './card';
import { Links } from './links';

const converter = new showdown.Converter({ simpleLineBreaks: true });

function HighlightedIllustration({
  data: { illustration, imagePosition, links },
}: {
  data: Queries.HighlightedIllustrationFragment;
}): JSX.Element {
  if (!illustration) return <></>;

  const { slug, title, illustration: _image, description } = illustration;
  const image = _image && getImage(_image);
  if (!image) return <></>;

  return (
    <Card
      actions={links && <Links links={links} />}
      description={description ? converter.makeHtml(description) : undefined}
      image={image}
      imageAlt={_image.alt || ''}
      imagePosition={imagePosition === 'right' ? 'right' : 'left'}
      key={slug}
      tag="Illustrations"
      title={title || ''}
    />
  );
}

export default HighlightedIllustration;

export const query = graphql`
  fragment HighlightedIllustration on DatoCmsHighlightedIllustration {
    id
    internal {
      type
    }
    illustration {
      slug
      title
      illustration {
        gatsbyImageData(aspectRatio: 1, width: 688)
        alt
      }
      description
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
