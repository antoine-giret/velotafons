import type { HeadProps, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React, { Fragment } from 'react';
import showdown from 'showdown';

import { Button } from '../components';
import Card from '../components/card';
import { useContent } from '../hooks';

const converter = new showdown.Converter();

function IndexPage({ data: { datoCmsHome, allDatoCmsPortrait } }: PageProps<Queries.HomeQuery>) {
  const { elements } = useContent({ data: datoCmsHome });

  if (!datoCmsHome) return <></>;

  const { nodes: portraits } = allDatoCmsPortrait;

  let cardIndex = -1;

  return (
    <>
      {elements?.map(({ Ele, data }) => <Ele data={data} key={data.id} />)}
      {portraits &&
        portraits.length > 0 &&
        portraits.map(({ slug, picture, pseudo, presentation }) => {
          const image = picture && getImage(picture);
          if (!image) return <Fragment key={slug} />;

          cardIndex++;

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
              imagePosition={cardIndex % 2 === 0 ? 'left' : 'right'}
              key={slug}
              tag="Portraits de vélotafeurs"
              title={`${pseudo} vélotafe !`}
            />
          );
        })}
    </>
  );
}

export default IndexPage;

export function Head({}: HeadProps) {
  return <title>Vélotafons !</title>;
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
  fragment HomeQuery on DatoCmsHome {
    hero {
      ...Hero
    }
    keyNumbersBlock {
      ...KeyNumbers
    }
  }
  query Home {
    datoCmsHome {
      ...HomeQuery
    }
    allDatoCmsPortrait(filter: { highlighted: { eq: true } }) {
      nodes {
        ...HomePortrait
      }
    }
  }
`;
