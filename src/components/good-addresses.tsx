import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import showdown from 'showdown';

import { Button } from './button';
import Card from './card';

const converter = new showdown.Converter();

function GoodAddresses({
  data: { title, description, image: _image, links },
  imagePosition,
}: {
  data: Queries.HomeGoodAddressesBlockFragment;
  imagePosition: 'left' | 'right';
}): JSX.Element {
  const image = _image && getImage(_image);
  if (!title || !image) return <></>;

  return (
    <Card
      actions={
        links && links.length > 0 ? (
          <>
            {links.map(
              (link) =>
                link &&
                ('to' in link ? (
                  <Button
                    link
                    colorScheme="primary"
                    key={link.id}
                    size="md"
                    to={link.to || '/'}
                    variant={link.variant || undefined}
                  >
                    {link.label}
                  </Button>
                ) : (
                  link.href && (
                    <Button
                      externalLink
                      colorScheme="primary"
                      href={link.href}
                      key={link.id}
                      size="md"
                      variant={link.variant || undefined}
                    >
                      {link.label}
                    </Button>
                  )
                )),
            )}
          </>
        ) : undefined
      }
      description={description ? converter.makeHtml(description) : undefined}
      image={image}
      imageAlt={_image.alt || ''}
      imagePosition={imagePosition}
      tag="Conseils"
      title={title}
    />
  );
}

export default GoodAddresses;
