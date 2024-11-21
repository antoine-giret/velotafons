import { Badge, Box, Heading, Text } from '@chakra-ui/react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';

export function Card({
  variant,
  imagePosition,
  image,
  imageFocalPoint,
  imageAlt,
  tag,
  title,
  subtitle,
  description,
  actions,
}: {
  actions?: JSX.Element | null;
  description?: string | null;
  image: IGatsbyImageData | string;
  imageAlt: string;
  imageFocalPoint?: {
    readonly x: number;
    readonly y: number;
  } | null;
  imagePosition: 'left' | 'right' | 'top';
  subtitle?: JSX.Element;
  tag?: string;
  title: string;
  variant?: 'outlined';
}): JSX.Element {
  return (
    <Box
      alignItems="flex-start"
      alignSelf="center"
      as="section"
      display="flex"
      flexDirection={
        imagePosition === 'top'
          ? 'column'
          : ['column', 'column', imagePosition === 'left' ? 'row' : 'row-reverse']
      }
      height="100%"
      maxWidth="100%"
      overflow="hidden"
      padding={variant === 'outlined' ? 0 : 5}
      width={1000}
      {...(variant === 'outlined'
        ? { border: '1px solid #eee', borderRadius: '16px' }
        : { gap: [3, 3, 5], padding: 5 })}
    >
      <Box
        borderRadius={variant === 'outlined' ? 0 : '16px'}
        flexShrink={0}
        overflow="hidden"
        width={imagePosition === 'top' ? '100%' : ['100%', '100%', 300]}
      >
        {typeof image === 'string' ? (
          <Box
            aspectRatio={16 / 9}
            backgroundImage={`url(${image})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
          />
        ) : (
          <GatsbyImage
            alt={imageAlt}
            image={image}
            objectFit="cover"
            objectPosition={
              imageFocalPoint
                ? `${imageFocalPoint.x * 100}% ${imageFocalPoint.y * 100}%`
                : '50% 50%'
            }
            style={{ height: '100%' }}
          />
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        gap={5}
        padding={variant === 'outlined' ? 3 : 0}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          {tag && (
            <Box>
              <Badge variant="outline">{tag}</Badge>
            </Box>
          )}
          <Heading as="h2" fontSize="2xl" fontWeight={700}>
            {title}
          </Heading>
          {subtitle}
          {description && (
            <Text
              as="div"
              className="webkit-box"
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
