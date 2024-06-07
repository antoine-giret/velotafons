import { Box, Heading, Text } from '@chakra-ui/react';
import { HeadProps, PageProps, graphql } from 'gatsby';
import React from 'react';
import showdown from 'showdown';

import { CommonHead, Links } from '../components';
import { useContent, useHead } from '../hooks';

const converter = new showdown.Converter({ simpleLineBreaks: true });

function MissionPage({
  data: { datoCmsMission, datoCmsNewsletter },
}: PageProps<Queries.MissionQuery>): JSX.Element {
  const { elements } = useContent({ data: datoCmsMission });

  if (!datoCmsMission) return <></>;

  return (
    <>
      {elements?.map(({ Ele, data }) => <Ele data={data} key={data.id} />)}
      {datoCmsNewsletter && (
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
            {datoCmsNewsletter.title}
          </Heading>
          {datoCmsNewsletter.description && (
            <Text
              as="div"
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(datoCmsNewsletter.description),
              }}
            />
          )}
          {datoCmsNewsletter.link && <Links links={[datoCmsNewsletter.link]} size="lg" />}
        </Box>
      )}
    </>
  );
}

export default MissionPage;

export function Head({ data: { site, datoCmsMission } }: HeadProps<Queries.MissionQuery>) {
  const { title, description, url } = useHead({
    data: { title: datoCmsMission?.hero?.title, description: datoCmsMission?.hero?.subtitle },
    site,
  });
  const imageUrl = datoCmsMission?.metaImage?.url || datoCmsMission?.hero?.backgroundImage?.url;

  return (
    <CommonHead
      description={description}
      imageUrl={imageUrl}
      title={title}
      url={`${url}/mission`}
    />
  );
}

export const query = graphql`
  fragment MissionQuery on DatoCmsMission {
    metaImage {
      url
    }
    hero {
      ...Hero
    }
    keyNumbersBlock {
      ...KeyNumbers
    }
    pillars {
      ...Cards
    }
  }
  query Mission {
    site {
      ...GatsbySite
    }
    datoCmsMission {
      ...MissionQuery
    }
    datoCmsNewsletter {
      ...Newsletter
    }
  }
`;
