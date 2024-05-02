import { Box, Icon, Text } from '@chakra-ui/react';
import type { HeadProps, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React, { Fragment, useState } from 'react';
import { IoLocation, IoToday } from 'react-icons/io5';
import showdown from 'showdown';

import { Button } from '../components';
import Card from '../components/card';
import GoodAddresses from '../components/good-addresses';
import { useContent } from '../hooks';

const converter = new showdown.Converter();

function IndexPage({
  data: { datoCmsHome, allDatoCmsPortrait, datoCmsGoodAddressesBlock, allDatoCmsEvent },
}: PageProps<Queries.HomeQuery>) {
  const [portraits] = useState(allDatoCmsPortrait.nodes.filter(({ picture }) => picture));
  const [events] = useState(allDatoCmsEvent.nodes.filter(({ image }) => image));
  const { elements } = useContent({ data: datoCmsHome });

  if (!datoCmsHome) return <></>;

  return (
    <>
      {elements?.map(({ Ele, data }) => <Ele data={data} key={data.id} />)}
      {portraits.length > 0 &&
        portraits.map(({ slug, picture, pseudo, presentation }, index) => {
          const image = picture && getImage(picture);
          if (!image) return <Fragment key={slug} />;

          return (
            <Card
              actions={
                <>
                  <Button link colorScheme="primary" size="md" to={`/blog/portraits/${slug}`}>
                    Découvrez son portrait
                  </Button>
                  <Button
                    link
                    colorScheme="primary"
                    size="md"
                    to={`/blog?tag=portrait`}
                    variant="outlined"
                  >
                    Découvrez tous les portraits
                  </Button>
                </>
              }
              description={presentation ? converter.makeHtml(presentation) : undefined}
              image={image}
              imageAlt={picture.alt || ''}
              imagePosition={index % 2 === 1 ? 'left' : 'right'}
              key={slug}
              tag="Portraits de vélotafeurs"
              title={`${pseudo} vélotafe !`}
            />
          );
        })}
      {datoCmsGoodAddressesBlock && (
        <GoodAddresses
          data={datoCmsGoodAddressesBlock}
          imagePosition={portraits.length % 2 === 1 ? 'left' : 'right'}
        />
      )}
      {events.length > 0 &&
        events.map(
          ({ slug, title, startDate, endDate, location, image: _image, description }, index) => {
            const image = _image && getImage(_image);
            if (!image) return <Fragment key={slug} />;

            return (
              <Card
                actions={
                  <>
                    <Button link colorScheme="primary" size="md" to={`/events/${slug}`}>
                      Voir l'évènement
                    </Button>
                    <Button link colorScheme="primary" size="md" to={`/events`} variant="outlined">
                      Découvrez tous les évènements
                    </Button>
                  </>
                }
                description={description ? converter.makeHtml(description) : undefined}
                image={image}
                imageAlt={_image.alt || ''}
                imagePosition={(portraits.length + index) % 2 === 0 ? 'left' : 'right'}
                key={slug}
                subtitle={
                  <Box display="flex" flexDirection="column" gap={1}>
                    {startDate && (
                      <Box alignItems="center" display="flex" gap={1}>
                        <Icon as={IoToday} color="primary.500" fontSize="sm" />
                        <Text color="grey" fontSize="sm">
                          {endDate
                            ? `Du ${new Intl.DateTimeFormat('fr-FR', {
                                dateStyle: 'medium',
                              }).format(new Date(startDate))} au ${new Intl.DateTimeFormat(
                                'fr-FR',
                                {
                                  dateStyle: 'medium',
                                },
                              ).format(new Date(endDate))}`
                            : `${new Intl.DateTimeFormat('fr-FR', {
                                dateStyle: 'medium',
                                timeStyle: 'medium',
                              }).format(new Date(startDate))}`}
                        </Text>
                      </Box>
                    )}
                    {location && (
                      <Box alignItems="center" display="flex" gap={1}>
                        <Icon as={IoLocation} color="primary.500" fontSize="sm" />
                        <Text color="grey" fontSize="sm">
                          {location}
                        </Text>
                      </Box>
                    )}
                  </Box>
                }
                tag="Évènements"
                title={title || ''}
              />
            );
          },
        )}
    </>
  );
}

export default IndexPage;

export function Head({ data: { site, datoCmsHome } }: HeadProps<Queries.HomeQuery>) {
  const _description = datoCmsHome?.hero?.subtitle;
  const description =
    _description && _description.length > 160
      ? `${_description.substring(0, 157)}...`
      : _description;
  const url = site?.siteMetadata?.siteUrl;
  const imageUrl = datoCmsHome?.hero?.backgroundImage?.url;

  return (
    <>
      <title>Vélotafons !</title>
      {description && <meta content={description} name="description" />}
      <meta content="Vélotafons !" property="og:title" />
      {description && <meta content={description} property="og:description" />}
      <meta content="website" property="og:type" />
      {url && <meta content={url} property="og:url" />}
      {imageUrl && <meta content={imageUrl} property="og:image" />}
    </>
  );
}

export const query = graphql`
  fragment HomePortrait on DatoCmsPortrait {
    slug
    pseudo
    presentation
    picture {
      gatsbyImageData(aspectRatio: 1, width: 688)
      alt
    }
  }
  fragment HomeGoodAddressesBlock on DatoCmsGoodAddressesBlock {
    title
    description
    image {
      gatsbyImageData(aspectRatio: 1, width: 688)
      alt
    }
    links {
      ... on DatoCmsLink {
        ...Link
      }
      ... on DatoCmsExternalLinkCopy {
        ...ExternalLink
      }
    }
  }
  fragment HomeEvent on DatoCmsEvent {
    slug
    title
    startDate(locale: "fr")
    endDate(locale: "fr")
    location
    image {
      gatsbyImageData(aspectRatio: 1, width: 688)
      alt
    }
    description
  }
  fragment HomeQuery on DatoCmsHome {
    hero {
      ...Hero
    }
    keyNumbersBlock {
      ...KeyNumbers
    }
  }
  query Home {
    site {
      siteMetadata {
        siteUrl
      }
    }
    datoCmsHome {
      ...HomeQuery
    }
    allDatoCmsPortrait(filter: { highlighted: { eq: true } }) {
      nodes {
        ...HomePortrait
      }
    }
    datoCmsGoodAddressesBlock {
      ...HomeGoodAddressesBlock
    }
    allDatoCmsEvent(filter: { highlighted: { eq: true } }) {
      nodes {
        ...HomeEvent
      }
    }
  }
`;
