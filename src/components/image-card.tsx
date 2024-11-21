import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import showdown from 'showdown';

import { Card } from './card';
import { Links } from './links';

const converter = new showdown.Converter({ simpleLineBreaks: true });

function ImageCard({
  data: { title, description, image: _image, imagePosition, links },
}: {
  data: Queries.ImageCardFragment;
}): JSX.Element {
  const image = _image && getImage(_image);
  if (!title || !image) return <></>;

  return (
    <Card
      actions={links && <Links links={links} />}
      description={description ? converter.makeHtml(description) : undefined}
      image={image}
      imageAlt={_image.alt || ''}
      imageFocalPoint={_image.focalPoint}
      imagePosition={imagePosition === 'right' ? 'right' : 'left'}
      tag="Conseils"
      title={title}
    />
  );
}

export default ImageCard;

export const query = graphql`
  fragment ImageCard on DatoCmsImageCard {
    id
    internal {
      type
    }
    title
    description
    image {
      gatsbyImageData(aspectRatio: 1, width: 688)
      focalPoint {
        x
        y
      }
      alt
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
