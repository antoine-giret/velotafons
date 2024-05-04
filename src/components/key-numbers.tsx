import { Box, Icon as ChakraIcon, Heading, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React, { Fragment } from 'react';
import { IconType } from 'react-icons';
import { IoBicycle, IoLeaf, IoLogoInstagram, IoLogoLinkedin, IoPeople } from 'react-icons/io5';

import { Links } from './links';

const keys = ['instagram', 'linkedin', 'members', 'distance', 'saved_co2'] as const;

export type TKey = (typeof keys)[number];

const keyNumberMap: { [key in TKey]: { Icon: IconType } } = {
  distance: { Icon: IoBicycle },
  instagram: { Icon: IoLogoInstagram },
  linkedin: { Icon: IoLogoLinkedin },
  members: { Icon: IoPeople },
  saved_co2: { Icon: IoLeaf },
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
      as="section"
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
        <Box display="flex" flexWrap="wrap" gap={5} justifyContent="center" width="100%">
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
      {links && <Links links={links} />}
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
    title
    description
    keyNumbers {
      id
      key
      caption
    }
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
