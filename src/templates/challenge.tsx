import {
  Avatar,
  Box,
  Heading,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { HeadProps, graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { IoToday, IoTrophy } from 'react-icons/io5';

import { Breadcrumb, Button, CommonHead } from '../components';
import { useHead } from '../hooks';
import { GeogroupService } from '../services';
import { formatPeriod, formatProgress, getPhotoURL } from '../utils/challenge';

function ChallengeTemplate({
  data: { challenge },
}: HeadProps<Queries.ChallengeTemplateQuery>): JSX.Element {
  const [initialized, setInitialized] = useState(false);
  const [leaderboard, setLeaderboard] = useState<
    | Array<{
        profile_picture?: string;
        rank: number;
        user_id: number;
        username: string;
        progress_value: number;
      }>
    | undefined
  >(undefined);
  const [hasNext, setNasNext] = useState<boolean | undefined>(undefined);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) getLeaderboard(page);
  }, [initialized, page]);

  async function getLeaderboard(page: number) {
    if (!challenge?.data?.id) return;

    setNasNext(undefined);

    try {
      const { results, hasNext } = await GeogroupService.getLeaderboard(challenge.data.id, {
        page,
      });

      setLeaderboard(page === 1 || !leaderboard ? results : [...leaderboard, ...results]);
      setNasNext(hasNext);
    } catch (err) {
      console.error(err);
    }
  }

  if (!challenge) return <></>;

  const { data } = challenge;
  if (!data) return <></>;

  const {
    title,
    start_datetime,
    end_datetime,
    photo,
    description,
    collaboration_type,
    target_type,
    target_value,
    progress_value,
  } = data;
  if (!start_datetime || !end_datetime) return <></>;

  const startDatetime = new Date(start_datetime);
  const endDatetime = new Date(end_datetime);
  const progress = formatProgress({
    collaboration_type,
    target_type,
    target_value,
    progress_value,
  });
  const imageUrl = getPhotoURL(photo);

  return (
    <Box
      alignSelf="center"
      display="flex"
      flexDirection="column"
      gap={5}
      maxWidth="100%"
      padding={5}
      width={1000}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Breadcrumb
          items={[{ key: 'challenges', to: '/challenges', label: 'Les challenges Geovelo' }]}
        />
        <Box
          border="1px solid #eee"
          borderRadius="8px"
          flexShrink={0}
          overflow="hidden"
          width="100%"
        >
          <img src={imageUrl} style={{ width: '100%' }} />
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Heading as="h1" fontSize="3xl" fontWeight={700}>
            {title}
          </Heading>
          <Box alignItems="center" display="flex" flexDirection="row" gap={1}>
            <Icon as={IoToday} color="grey" />
            <Text color="grey" fontSize="sm">
              {formatPeriod({ startDatetime, endDatetime })}
            </Text>
          </Box>
          {progress && (
            <Box alignItems="center" display="flex" flexDirection="row" gap={1}>
              <Icon as={IoTrophy} color="grey" />
              <Text color="grey" fontSize="sm">
                {progress}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      {description && <Text>{description}</Text>}
      <Box as="section" display="flex" flexDirection="column" gap={3}>
        <Heading as="h2" fontSize="2xl" fontWeight={700}>
          Classement
        </Heading>
        <TableContainer>
          <Table minWidth="100%" size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th width={50}>#</Th>
                <Th>Pseudo</Th>
                <Th width={50}>
                  {target_type === 'TRAVELED_DISTANCE'
                    ? 'Distance'
                    : target_type === 'CYCLING_DAYS'
                      ? 'Jours'
                      : target_type === 'TRACES_COUNT'
                        ? 'Trajets'
                        : 'Points'}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboard?.map(({ user_id, rank, profile_picture, username, progress_value }) => {
                const progress = formatProgress({
                  collaboration_type: 'INDIVIDUAL',
                  target_type,
                  progress_value,
                });

                return (
                  <Tr key={user_id}>
                    <Td>{rank}</Td>
                    <Td>
                      <Box alignItems="center" display="flex" gap={1}>
                        <Avatar
                          name={username}
                          size="xs"
                          src={
                            profile_picture
                              ? `https://backend.geovelo.fr${profile_picture}`
                              : undefined
                          }
                        />
                        <span>{username}</span>
                      </Box>
                    </Td>
                    <Td>{progress}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        {hasNext !== false && (
          <Box display="flex" justifyContent="center">
            <Button
              colorScheme="primary"
              disabled={hasNext === undefined}
              onClick={() => setPage(page + 1)}
              variant="outlined"
            >
              Voir plus
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ChallengeTemplate;

export function Head({
  pageContext: { slug },
  data: { site, challenge },
}: HeadProps<Queries.ChallengeTemplateQuery, { slug: string }>) {
  const { title, description, url } = useHead({
    data: { title: challenge?.data?.title, description: challenge?.data?.description },
    site,
  });
  const imageUrl = getPhotoURL(challenge?.data?.photo || null);

  return (
    <CommonHead
      description={description}
      imageUrl={imageUrl}
      title={title}
      url={`${url}/adresses/${slug}`}
    />
  );
}

export const query = graphql`
  query ChallengeTemplate($id: Int!) {
    site {
      ...GatsbySite
    }
    challenge(data: { id: { eq: $id } }) {
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
  }
`;
