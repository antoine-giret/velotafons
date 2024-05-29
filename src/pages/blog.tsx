import { Box } from '@chakra-ui/react';
import { HeadProps, Link, PageProps, graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';

import { Button, CommonHead, EventCard, GoodAddressCard, PortraitCard } from '../components';
import { useContent, useHead } from '../hooks';

type TItem = { key: string; publicationDate: Date } & (
  | { data: Queries.BlogHubPortraitFragment; type: 'portrait' }
  | { data: Queries.BlogHubGoodAddressFragment; type: 'goodAddress' }
  | { data: Queries.BlogHubEventFragment; type: 'event' }
);

function BlogPage({
  data: { datoCmsBlog, allDatoCmsPortrait, allDatoCmsGoodAddress, allDatoCmsEvent },
  location: { search },
}: PageProps<Queries.BlogQuery>): JSX.Element {
  const [tags] = useState(() => {
    if (search) {
      return (
        search
          .slice(1)
          .split('&')
          .map((ele) => ele.split('='))
          .find(([key]) => key === 'tags')?.[1]
          .split(',')
          .filter((tag) => ['adresses', 'portraits', 'evenements'].includes(tag)) || []
      );
    }

    return [];
  });
  const [portraitsDisplayed, togglePortraits] = useState(
    tags.length === 0 || tags.includes('portraits'),
  );
  const [goodAddressesDisplayed, toggleGoodAddresses] = useState(
    tags.length === 0 || tags.includes('adresses'),
  );
  const [eventsDisplayed, toggleEvents] = useState(
    tags.length === 0 || tags.includes('evenements'),
  );
  const [items, setItems] = useState<Array<TItem>>(() => getItems());
  const { elements } = useContent({ data: datoCmsBlog });

  useEffect(() => {
    setItems(getItems());

    if (typeof window !== undefined) {
      const url = new URL(window.location.href);
      url.searchParams.set(
        'tags',
        [
          portraitsDisplayed ? 'portraits' : '',
          goodAddressesDisplayed ? 'adresses' : '',
          eventsDisplayed ? 'evenements' : '',
        ]
          .filter(Boolean)
          .join(','),
      );
      window.history.replaceState(null, '', url.toString());
    }
  }, [portraitsDisplayed, goodAddressesDisplayed]);

  function getItems() {
    const _items: Array<TItem> = [];

    if (portraitsDisplayed) {
      _items.push(
        ...allDatoCmsPortrait.nodes.reduce<TItem[]>((res, data) => {
          if (data.publicationDate) {
            res.push({
              type: 'portrait',
              key: `portrait-${data.slug}`,
              publicationDate: new Date(data.publicationDate),
              data,
            });
          }

          return res;
        }, []),
      );
    }

    if (goodAddressesDisplayed) {
      _items.push(
        ...allDatoCmsGoodAddress.nodes.reduce<TItem[]>((res, data) => {
          if (data.publicationDate) {
            res.push({
              type: 'goodAddress',
              key: `good-address-${data.slug}`,
              publicationDate: new Date(data.publicationDate),
              data,
            });
          }

          return res;
        }, []),
      );
    }

    if (eventsDisplayed) {
      _items.push(
        ...allDatoCmsEvent.nodes.reduce<TItem[]>((res, data) => {
          if (data.startDate) {
            res.push({
              type: 'event',
              key: `event-${data.slug}`,
              publicationDate: new Date(data.startDate),
              data,
            });
          }

          return res;
        }, []),
      );
    }

    return _items.sort((a, b) => a.publicationDate.getTime() - b.publicationDate.getTime());
  }

  if (!datoCmsBlog) return <></>;

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
        <Box columnGap={2} display="flex" flexWrap="wrap" rowGap={1}>
          <Button
            colorScheme="primary"
            onClick={() => togglePortraits(!portraitsDisplayed)}
            size="sm"
            variant={portraitsDisplayed ? 'solid' : 'outlined'}
          >
            Portraits de vélotafeurs
          </Button>
          <Button
            colorScheme="primary"
            onClick={() => toggleGoodAddresses(!goodAddressesDisplayed)}
            size="sm"
            variant={goodAddressesDisplayed ? 'solid' : 'outlined'}
          >
            Bonnes adresses
          </Button>
          <Button
            colorScheme="primary"
            onClick={() => toggleEvents(!eventsDisplayed)}
            size="sm"
            variant={eventsDisplayed ? 'solid' : 'outlined'}
          >
            Évènements
          </Button>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={3}>
          {items.map(({ key, type, data }) => {
            return (
              <Box
                as={Link}
                borderRadius="16px"
                key={key}
                overflow="hidden"
                sx={{
                  '&:hover': {
                    backgroundColor: '#efefef',
                    img: { transform: 'scale(1.1)', transition: '0.5s ease' },
                  },
                }}
                to={
                  type === 'portrait'
                    ? `/blog/portraits/${data.slug}`
                    : type === 'event'
                      ? `/blog/evenements/${data.slug}`
                      : `/blog/adresses/${data.slug}`
                }
                width={['100%', 'calc((100% - 24px) / 2)', 'calc((100% - 48px) / 3)']}
              >
                {type === 'portrait' ? (
                  <PortraitCard data={data} imagePosition="top" variant="outlined" />
                ) : type === 'event' ? (
                  <EventCard data={data} />
                ) : (
                  <GoodAddressCard data={data} />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default BlogPage;

export function Head({ data: { site, datoCmsBlog } }: HeadProps<Queries.BlogQuery>) {
  const { title, description, url } = useHead({
    data: { title: datoCmsBlog?.hero?.title, description: datoCmsBlog?.hero?.subtitle },
    site,
  });
  const imageUrl = datoCmsBlog?.hero?.backgroundImage?.url;

  return (
    <CommonHead description={description} imageUrl={imageUrl} title={title} url={`${url}/blog`} />
  );
}

export const query = graphql`
  fragment BlogHubPortrait on DatoCmsPortrait {
    slug
    pseudo
    publicationDate
    presentation
    picture {
      gatsbyImageData(aspectRatio: 1.6, width: 688)
      alt
    }
  }
  fragment BlogHubGoodAddress on DatoCmsGoodAddress {
    slug
    title
    publicationDate
    address
    website
    description
    photos {
      gatsbyImageData(aspectRatio: 1.6, width: 688)
      alt
    }
  }
  fragment BlogHubEvent on DatoCmsEvent {
    slug
    title
    startDate
    endDate
    location
    description
    image {
      gatsbyImageData(aspectRatio: 1.6, width: 688)
      alt
    }
  }
  fragment BlogQuery on DatoCmsBlog {
    hero {
      ...Hero
    }
  }
  query Blog {
    site {
      ...GatsbySite
    }
    datoCmsBlog {
      ...BlogQuery
    }
    allDatoCmsPortrait {
      nodes {
        ...BlogHubPortrait
      }
    }
    allDatoCmsGoodAddress {
      nodes {
        ...BlogHubGoodAddress
      }
    }
    allDatoCmsEvent {
      nodes {
        ...BlogHubEvent
      }
    }
  }
`;
