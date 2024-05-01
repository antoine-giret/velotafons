import { Badge, Box, Heading, Text } from '@chakra-ui/react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';

function Card({
  imagePosition,
  image,
  imageAlt,
  tag,
  title,
  description,
  actions,
}: {
  actions?: JSX.Element;
  description?: string;
  image: IGatsbyImageData;
  imageAlt: string;
  imagePosition: 'left' | 'right';
  tag?: string;
  title: string;
}): JSX.Element {
  return (
    <Box
      alignItems="flex-start"
      alignSelf="center"
      display="flex"
      flexDirection={['column', 'column', imagePosition === 'left' ? 'row' : 'row-reverse']}
      gap={5}
      maxWidth="100%"
      padding={5}
      width={1000}
    >
      <Box borderRadius="16px" flexShrink={0} overflow="hidden" width={['100%', '100%', 300]}>
        <GatsbyImage alt={imageAlt} image={image} objectFit="cover" style={{ height: '100%' }} />
      </Box>
      <Box display="flex" flexDirection="column" flexGrow={1} gap={5}>
        <Box display="flex" flexDirection="column" gap={1}>
          {tag && (
            <Box>
              <Badge variant="outline">{tag}</Badge>
            </Box>
          )}
          <Heading as="h2" fontSize="2xl" fontWeight={700}>
            {title}
          </Heading>
          {description && (
            <Text
              as="div"
              dangerouslySetInnerHTML={{ __html: description }}
              display="-webkit-box"
              overflow="hidden"
              style={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
            />
          )}
        </Box>
        {actions && (
          <Box columnGap={3} display="flex" flexWrap="wrap" rowGap={2}>
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Card;
