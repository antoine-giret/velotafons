import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import showdown from 'showdown';

import { Card } from './card';

const converter = new showdown.Converter({ simpleLineBreaks: true });

export function GoodAddressCard({
  data,
}: {
  data: Queries.BlogHubGoodAddressFragment;
}): JSX.Element {
  if (!data) return <></>;

  const { slug, title, description, photos } = data;
  const image = photos?.[0] && getImage(photos[0]);
  if (!title || !image) return <></>;

  return (
    <Card
      description={description ? converter.makeHtml(description) : undefined}
      image={image}
      imageAlt={photos[0].alt || ''}
      imagePosition="top"
      key={slug}
      tag="Bonnes adresses"
      title={title}
      variant="outlined"
    />
  );
}
