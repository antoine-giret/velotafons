import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import showdown from 'showdown';

import { Card } from './card';
import { Links } from './links';

const converter = new showdown.Converter({ simpleLineBreaks: true });

export function PortraitCard({
  imagePosition,
  data,
  links,
  variant,
}: {
  data: Queries.HighlightedPortraitFragment['portrait'] | Queries.BlogHubPortraitFragment;
  imagePosition: 'left' | 'right' | 'top';
  links?: readonly (Queries.LinkFragment | Queries.ExternalLinkFragment | null)[] | null;
  variant?: 'outlined';
}): JSX.Element {
  if (!data) return <></>;

  const { slug, picture, pseudo, presentation } = data;
  const image = picture && getImage(picture);
  if (!image) return <></>;

  return (
    <Card
      actions={links && <Links links={links} />}
      description={presentation ? converter.makeHtml(presentation) : undefined}
      image={image}
      imageAlt={picture.alt || ''}
      imageFocalPoint={picture.focalPoint}
      imagePosition={imagePosition}
      key={slug}
      tag="Portraits de vélotafeurs"
      title={`${pseudo} vélotafe !`}
      variant={variant}
    />
  );
}
