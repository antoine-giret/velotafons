import { Box, Text } from '@chakra-ui/react';
import { HeadProps, Link, PageProps, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { Fragment } from 'react';

import { CommonHead } from '../components';
import { useContent, useHead } from '../hooks';

function HallOfFamePage({
  data: { datoCmsHallOfFame },
}: PageProps<Queries.HallOfFameQuery>): JSX.Element {
  const { elements } = useContent({ data: datoCmsHallOfFame });

  return (
    <>
      {elements?.map(({ Ele, data }) => <Ele data={data} key={data.id} />)}
      <Box
        alignSelf="center"
        display="flex"
        flexDirection="column"
        gap={5}
        maxWidth="100%"
        padding={5}
        width={1000}
      >
        <Box display="flex" flexWrap="wrap" gap={3}>
          <Box
            alignItems="center"
            alignSelf="stretch"
            backgroundColor="#95C475"
            borderRadius={16}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            overflow="hidden"
            width={[
              'calc((100% - 24px) / 2)',
              'calc((100% - 48px) / 3)',
              'calc((100% - 72px) / 4)',
            ]}
          >
            <Text color="#000" fontSize="3rem" fontWeight={700}>
              ?
            </Text>
          </Box>
          {datoCmsHallOfFame?.cards?.map((data, index) => {
            if (!data) return <Fragment key={index} />;

            const { portrait, picture: _picture } = data;
            const picture = _picture && getImage(_picture);
            if (!picture || !portrait) return <Fragment key={index} />;

            return (
              <Box
                as={Link}
                borderRadius={16}
                key={index}
                overflow="hidden"
                sx={{
                  '&:hover': {
                    transform: 'rotate(-3deg) !important',
                    transition: '0.5s ease',
                  },
                }}
                to={`/blog/portraits/${portrait.slug}`}
                width={[
                  'calc((100% - 24px) / 2)',
                  'calc((100% - 48px) / 3)',
                  'calc((100% - 72px) / 4)',
                ]}
              >
                <GatsbyImage alt={`Carte de ${portrait.pseudo}`} image={picture} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default HallOfFamePage;

export function Head({ data: { site, datoCmsHallOfFame } }: HeadProps<Queries.HallOfFameQuery>) {
  const { title, description, url } = useHead({
    data: {
      title: datoCmsHallOfFame?.hero?.title,
      description: datoCmsHallOfFame?.hero?.subtitle,
    },
    site,
  });
  const imageUrl =
    datoCmsHallOfFame?.metaImage?.url || datoCmsHallOfFame?.hero?.backgroundImage?.url;

  return (
    <CommonHead
      description={description}
      imageUrl={imageUrl}
      title={title}
      url={`${url}/hall-of-fame`}
    />
  );
}

export const query = graphql`
  fragment HallOfFameQuery on DatoCmsHallOfFame {
    metaImage {
      url
    }
    hero {
      ...Hero
    }
    cards {
      picture {
        gatsbyImageData(width: 1000)
      }
      portrait {
        slug
        pseudo
      }
    }
  }
  query HallOfFame {
    site {
      ...GatsbySite
    }
    datoCmsHallOfFame {
      ...HallOfFameQuery
    }
  }
`;
