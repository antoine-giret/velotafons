import { Box, Icon as ChakraIcon, Heading, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React, { Fragment } from 'react';
import { IconType } from 'react-icons';
import { IoBicycle, IoLogoInstagram, IoLogoLinkedin, IoPeople } from 'react-icons/io5';

import { Button } from './button';

const keys = ['instagram', 'linkedin', 'members', 'distance'] as const;

export type TKey = (typeof keys)[number];

const keyNumberMap: { [key in TKey]: { Icon: IconType } } = {
  distance: { Icon: IoBicycle },
  instagram: { Icon: IoLogoInstagram },
  linkedin: { Icon: IoLogoLinkedin },
  members: { Icon: IoPeople },
};

function KeyNumbers({
  data: { title, description, keyNumbers, links },
}: {
  data: Queries.KeyNumbersFragment;
}): JSX.Element {
  return (
    <Box
      alignItems="center"
      alignSelf="center"
      display="flex"
      flexDirection="column"
      gap={5}
      maxWidth="100%"
      padding={5}
      width={1000}
    >
      <Heading as="h2" fontSize="2xl" fontWeight={700} textAlign="center">
        {title}
      </Heading>
      {description && <Text textAlign="center">{description}</Text>}
      {keyNumbers && keyNumbers.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={5} width="100%">
          {keyNumbers.map((keyNumber, index) => {
            if (!keyNumber) return <Fragment key={index} />;

            const key = keyNumber.key as TKey;
            if (!key || !keys.includes(key)) return <Fragment key={index} />;

            const { caption } = keyNumber;
            const { Icon } = keyNumberMap[key];

            return (
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                gap={2}
                key={key}
                width={['100%', 'calc((100% - 40px) / 2)', 'calc((100% - 120px) / 4)']}
              >
                <ChakraIcon as={Icon} color="primary.500" fontSize="3xl" />
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Text fontSize="3xl" fontWeight={700}>
                    XXX
                  </Text>
                  <Text align="center">{caption}</Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
      {links && links.length > 0 && (
        <Box columnGap={3} display="flex" flexWrap="wrap" justifyContent="center" rowGap={2}>
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
        </Box>
      )}
    </Box>
  );
}

export default KeyNumbers;

export const query = graphql`
  fragment KeyNumbers on DatoCmsKeyNumbersBlock {
    id
    internal {
      type
    }
    order
    title
    description
    keyNumbers {
      id
      key
      caption
    }
    links {
      ... on DatoCmsExternalLinkCopy {
        id
        href
        label
        variant
      }
      ... on DatoCmsLink {
        id
        to
        label
        variant
      }
    }
  }
`;
