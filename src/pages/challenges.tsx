import { Box, Icon, Text } from '@chakra-ui/react';
import { HeadProps, Link, PageProps, graphql } from 'gatsby';
import React from 'react';
import { IoTodayOutline, IoTrophyOutline } from 'react-icons/io5';

import { Card, CommonHead } from '../components';
import { useContent, useHead } from '../hooks';
import { formatPeriod, formatProgress, getPhotoURL } from '../utils/challenge';

function ChallengesPage({
  data: {
    datoCmsChallengesGeovelo,
    allChallenge: { nodes: allChallenges },
  },
}: PageProps<Queries.ChallengesQuery>): JSX.Element {
  const { elements } = useContent({ data: datoCmsChallengesGeovelo });

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
          {allChallenges.map(({ data }) => {
            if (!data) return <></>;

            const {
              id,
              title,
              start_datetime,
              end_datetime,
              description,
              photo,
              collaboration_type,
              target_type,
              target_value,
              progress_value,
            } = data;
            if (!title || !start_datetime || !end_datetime) return <></>;

            const startDatetime = new Date(start_datetime);
            const endDatetime = new Date(end_datetime);
            const progress = formatProgress({
              collaboration_type,
              target_type,
              target_value,
              progress_value,
            });

            return (
              <Box
                as={Link}
                borderRadius="16px"
                key={id}
                overflow="hidden"
                sx={{
                  '&:hover': {
                    backgroundColor: '#efefef',
                    img: { transform: 'scale(1.1)', transition: '0.5s ease' },
                  },
                }}
                to={`/challenges/${id}`}
                width={['100%', 'calc((100% - 24px) / 2)', 'calc((100% - 48px) / 3)']}
              >
                <Card
                  image={getPhotoURL(photo)}
                  imageAlt=""
                  imagePosition="top"
                  subtitle={
                    <Box display="flex" flexDirection="column" gap={2}>
                      <Text
                        className="webkit-box"
                        display="-webkit-box"
                        overflow="hidden"
                        style={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                      >
                        {description || 'Parcourez le plus de kilomètres à vélo'}
                      </Text>
                      <Box display="flex" flexDirection="column" gap={1}>
                        <Box alignItems="center" display="flex" flexDirection="row" gap={1}>
                          <Icon as={IoTodayOutline} color="grey" />
                          <Text color="grey" fontSize="sm">
                            {formatPeriod({ startDatetime, endDatetime })}
                          </Text>
                        </Box>
                        {progress && (
                          <Box alignItems="center" display="flex" flexDirection="row" gap={1}>
                            <Icon as={IoTrophyOutline} color="grey" />
                            <Text color="grey" fontSize="sm">
                              {progress}
                            </Text>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  }
                  title={title}
                  variant="outlined"
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default ChallengesPage;

export function Head({
  data: { site, datoCmsChallengesGeovelo },
}: HeadProps<Queries.ChallengesQuery>) {
  const { title, description, url } = useHead({
    data: {
      title: datoCmsChallengesGeovelo?.hero?.title,
      description: datoCmsChallengesGeovelo?.hero?.subtitle,
    },
    site,
  });
  const imageUrl =
    datoCmsChallengesGeovelo?.metaImage?.url ||
    datoCmsChallengesGeovelo?.hero?.backgroundImage?.url;

  return (
    <CommonHead
      description={description}
      imageUrl={imageUrl}
      title={title}
      url={`${url}/challenges`}
    />
  );
}

export const query = graphql`
  fragment ChallengesQuery on DatoCmsChallengesGeovelo {
    metaImage {
      url
    }
    hero {
      ...Hero
    }
  }
  fragment Challenge on challenge {
    data {
      id
      title
      start_datetime
      end_datetime
      photo
      description
      collaboration_type
      target_type
      target_value
      progress_value
    }
  }
  query Challenges {
    site {
      ...GatsbySite
    }
    datoCmsChallengesGeovelo {
      ...ChallengesQuery
    }
    allChallenge(sort: { data: { start_datetime: DESC } }) {
      nodes {
        ...Challenge
      }
    }
  }
`;
