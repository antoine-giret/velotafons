import { Box } from '@chakra-ui/react';
import React from 'react';

import { Button } from './button';

export function Links({
  links,
  size,
}: {
  links: readonly (Queries.LinkFragment | Queries.ExternalLinkFragment | null)[];
  size?: 'md' | 'lg';
}): JSX.Element {
  if (links.length === 0) return <></>;

  return (
    <Box columnGap={3} display="flex" flexWrap="wrap" rowGap={2}>
      {links.map(
        (link) =>
          link &&
          ('to' in link ? (
            <Button
              link
              colorScheme="primary"
              key={link.id}
              size={size || 'md'}
              to={link.to || '/'}
              variant={link.variant || 'solid'}
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
                size={size || 'md'}
                variant={link.variant || 'solid'}
              >
                {link.label}
              </Button>
            )
          )),
      )}
    </Box>
  );
}
