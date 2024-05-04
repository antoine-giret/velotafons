import { Box, Heading, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { Fragment } from 'react';
import showdown from 'showdown';

const converter = new showdown.Converter({ simpleLineBreaks: true });

function Cards({ data: { title, cards } }: { data: Queries.CardsFragment }): JSX.Element {
  if (!cards || cards.length === 0) return <></>;

  return (
    <Box
      alignItems="center"
      backgroundColor="#eee"
      display="flex"
      flexDirection="column"
      sx={{ '&:last-child': { paddingBottom: 5 } }}
      width="100%"
    >
      <Box
        alignItems="center"
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
        <Box
          columnGap={5}
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          rowGap={[3, 3, 5]}
          width="100%"
        >
          {cards.map((card, index) => {
            if (!card) return <Fragment key={index} />;

            const { icon: _icon, title, description } = card;
            const icon = _icon && getImage(_icon);
            if (!icon) return <Fragment key={index} />;

            return (
              <Box
                alignItems="center"
                backgroundColor="#fff"
                borderRadius="16px"
                display="flex"
                flexDirection="column"
                gap={2}
                key={index}
                padding={3}
                width={['100%', '100%', 'calc((100% - 40px) / 2)']}
              >
                <GatsbyImage alt={_icon.alt || ''} image={icon} />
                <Box alignItems="center" display="flex" flexDirection="column">
                  <Text fontSize="lg" fontWeight={700}>
                    {title}
                  </Text>
                  {description && (
                    <Text
                      align="center"
                      as="div"
                      dangerouslySetInnerHTML={{ __html: converter.makeHtml(description) }}
                    />
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Cards;

export const query = graphql`
  fragment Cards on DatoCmsCardsBlock {
    id
    internal {
      type
    }
    title
    cards {
      icon {
        gatsbyImageData(width: 30, placeholder: TRACED_SVG)
        alt
      }
      title
      description
    }
  }
`;
