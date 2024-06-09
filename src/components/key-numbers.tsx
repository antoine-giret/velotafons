import { Box, Icon as ChakraIcon, Heading, Skeleton, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React, { Fragment, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { IoBicycle, IoLeaf, IoLogoInstagram, IoLogoLinkedin, IoPeople } from 'react-icons/io5';

import { GeogroupService } from '../services';
import { formatNumber, toDistance } from '../utils/units';

import { Links } from './links';

const keys = ['instagram', 'linkedin', 'members', 'distance', 'saved_co2'] as const;

export type TKey = (typeof keys)[number];

const keyNumberMap: { [key in TKey]: { format: (value: number) => string; Icon: IconType } } = {
  distance: { format: toDistance, Icon: IoBicycle },
  instagram: { format: formatNumber, Icon: IoLogoInstagram },
  linkedin: { format: formatNumber, Icon: IoLogoLinkedin },
  members: { format: formatNumber, Icon: IoPeople },
  saved_co2: { format: (value) => `${formatNumber(value)} kg`, Icon: IoLeaf },
};

function KeyNumbers({
  data: { title, description, keyNumbers, links },
}: {
  data: Queries.KeyNumbersFragment;
}): JSX.Element {
  const [initialized, setInitialized] = useState(false);
  const [values, setValues] = useState<{ [key in TKey]?: number }>({});

  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) getGeoveloData();
  }, [initialized]);

  async function getGeoveloData() {
    try {
      const { members, distance, saved_co2 } = await GeogroupService.getGeogroup();

      setValues({ ...values, members, distance, saved_co2 });
    } catch (err) {
      console.error(err);
    }
  }

  if (!keyNumbers || keyNumbers.length === 0) return <></>;

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
      <Box
        columnGap={5}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        rowGap={[3, 5, 5]}
        width="100%"
      >
        {keyNumbers.map((keyNumber, index) => {
          if (!keyNumber) return <Fragment key={index} />;

          const key = keyNumber.key as TKey;
          if (!key || !keys.includes(key)) return <Fragment key={index} />;

          const { caption, value: _value } = keyNumber;
          const value = typeof _value === 'number' ? _value : values[key];
          const { Icon, format } = keyNumberMap[key];

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
              <Box
                suppressHydrationWarning
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                {value !== undefined ? (
                  <Text fontSize="3xl" fontWeight={700}>
                    {format(value)}
                  </Text>
                ) : (
                  <Box alignItems="center" display="flex" height="45px">
                    <Skeleton height="20px" width="50px" />
                  </Box>
                )}
                <Text align="center">{caption}</Text>
              </Box>
            </Box>
          );
        })}
      </Box>
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
      value
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
