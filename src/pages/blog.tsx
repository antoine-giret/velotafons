import { Box } from '@chakra-ui/react';
import { HeadProps, Link, PageProps, graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';

import {
  Button,
  CommonHead,
  EventCard,
  GoodAddressCard,
  IllustrationCard,
  PortraitCard,
} from '../components';
import { useContent, useHead } from '../hooks';

export const tags = ['illustrations', 'goodAddresses', 'portraits', 'events'] as const;

export type TTag = (typeof tags)[number];

const tagsMap: { [key in TTag]: { label: string; searchValue: string } } = {
  illustrations: { label: 'Illustrations', searchValue: 'illustrations' },
  goodAddresses: { label: 'Bonnes adresses', searchValue: 'adresses' },
  portraits: { label: 'Portraits de vélotafeurs', searchValue: 'portraits' },
  events: { label: 'Évènements', searchValue: 'evenements' },
};

type TItem = { key: string; publicationDate: Date } & (
  | { data: Queries.BlogHubIllustrationFragment; type: 'illustration' }
  | { data: Queries.BlogHubPortraitFragment; type: 'portrait' }
  | { data: Queries.BlogHubGoodAddressFragment; type: 'goodAddress' }
  | { data: Queries.BlogHubEventFragment; type: 'event' }
);

function BlogPage({
  data: {
    datoCmsBlog,
    allDatoCmsIllustration,
    allDatoCmsPortrait,
    allDatoCmsGoodAddress,
    allDatoCmsEvent,
  },
  location: { search },
}: PageProps<Queries.BlogQuery>): JSX.Element {
  const [initialSelectedTags] = useState(() => {
    if (search) {
      return (
        search
          .slice(1)
          .split('&')
          .map((ele) => ele.split('='))
          .find(([key]) => key === 'tags')?.[1]
          .split(',')
          .filter((tag) => tags.map((key) => tagsMap[key].searchValue).includes(tag as TTag)) || []
      );
    }

    return [];
  });
  const [selectedTags, selectTags] = useState<{ [key in TTag]: boolean }>({
    illustrations:
      initialSelectedTags.length === 0 ||
      initialSelectedTags.includes(tagsMap.illustrations.searchValue),
    portraits:
      initialSelectedTags.length === 0 ||
      initialSelectedTags.includes(tagsMap.portraits.searchValue),
    goodAddresses:
      initialSelectedTags.length === 0 ||
      initialSelectedTags.includes(tagsMap.goodAddresses.searchValue),
    events:
      initialSelectedTags.length === 0 || initialSelectedTags.includes(tagsMap.events.searchValue),
  });
  const [items, setItems] = useState<Array<TItem>>(() => getItems());
  const { elements } = useContent({ data: datoCmsBlog });

  useEffect(() => {
    setItems(getItems());

    if (typeof window !== undefined) {
      const url = new URL(window.location.href);
      url.searchParams.set(
        'tags',
        tags
          .map((key) => (selectedTags[key] ? tagsMap[key].searchValue : ''))
          .filter(Boolean)
          .join(','),
      );
      window.history.replaceState(null, '', url.toString());
    }
  }, [selectedTags]);

  function getItems() {
    const _items: Array<TItem> = [];

    if (selectedTags.illustrations) {
      _items.push(
        ...allDatoCmsIllustration.nodes.reduce<TItem[]>((res, data) => {
          if (data.publicationDate) {
            res.push({
              type: 'illustration',
              key: `illustration-${data.slug}`,
              publicationDate: new Date(data.publicationDate),
              data,
            });
          }

          return res;
        }, []),
      );
    }

    if (selectedTags.portraits) {
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

    if (selectedTags.goodAddresses) {
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

    if (selectedTags.events) {
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

    return _items.sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime());
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
          {tags.map((key) => {
            const { label } = tagsMap[key];
            const active = selectedTags[key];

            return (
              <Button
                colorScheme="primary"
                key={key}
                onClick={() =>
                  (!active || Object.values(selectedTags).filter(Boolean).length > 1) &&
                  selectTags({ ...selectedTags, [key]: !active })
                }
                size="sm"
                variant={active ? 'solid' : 'outlined'}
              >
                {label}
              </Button>
            );
          })}
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
                  type === 'illustration'
                    ? `/blog/illustrations/${data.slug}`
                    : type === 'portrait'
                      ? `/blog/portraits/${data.slug}`
                      : type === 'event'
                        ? `/blog/evenements/${data.slug}`
                        : `/blog/adresses/${data.slug}`
                }
                width={['100%', 'calc((100% - 24px) / 2)', 'calc((100% - 48px) / 3)']}
              >
                {type === 'illustration' ? (
                  <IllustrationCard data={data} />
                ) : type === 'portrait' ? (
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
  const imageUrl = datoCmsBlog?.metaImage?.url || datoCmsBlog?.hero?.backgroundImage?.url;

  return (
    <CommonHead description={description} imageUrl={imageUrl} title={title} url={`${url}/blog`} />
  );
}

export const query = graphql`
  fragment BlogHubIllustration on DatoCmsIllustration {
    slug
    title
    publicationDate
    illustration {
      gatsbyImageData(aspectRatio: 1.6, width: 688)
      alt
    }
    description
  }
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
    metaImage {
      url
    }
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
    allDatoCmsIllustration {
      nodes {
        ...BlogHubIllustration
      }
    }
    allDatoCmsPortrait(filter: { onlyForAllOfFame: { ne: true } }) {
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
