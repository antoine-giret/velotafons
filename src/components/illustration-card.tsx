import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import showdown from 'showdown';

import { Card } from './card';

const converter = new showdown.Converter({ simpleLineBreaks: true });

export function IllustrationCard({
  data,
}: {
  data: Queries.BlogHubIllustrationFragment;
}): JSX.Element {
  if (!data) return <></>;

  const { slug, title, description, illustration } = data;
  const image = illustration && getImage(illustration);
  if (!title || !image) return <></>;

  return (
    <Card
      description={description ? converter.makeHtml(description) : undefined}
      image={image}
      imageAlt={illustration.alt || ''}
      imageFocalPoint={illustration.focalPoint}
      imagePosition="top"
      key={slug}
      tag="Illustration"
      title={title}
      variant="outlined"
    />
  );
}
