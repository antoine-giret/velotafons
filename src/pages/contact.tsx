import { Box } from '@chakra-ui/react';
import { HeadProps, PageProps, graphql } from 'gatsby';
import React from 'react';

import { CommonHead } from '../components';
import { useContent, useHead } from '../hooks';

function ContactPage({ data: { datoCmsContact } }: PageProps<Queries.ContactQuery>): JSX.Element {
  const { elements } = useContent({ data: datoCmsContact });

  if (!datoCmsContact) return <></>;

  return (
    <>
      {elements?.map(({ Ele, data }) => <Ele data={data} key={data.id} />)}
      <Box
        alignSelf="center"
        display="flex"
        flexDirection="column"
        gap={5}
        maxWidth="100%"
        paddingBottom={5}
        paddingX={5}
        width={1000}
      >
        <iframe
          frameBorder="0"
          height="600px"
          referrerPolicy="origin"
          sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
          src="https://plugins.crisp.chat/urn:crisp.im:contact-form:0/contact/0c676153-582d-4a29-97a5-7cf6de76d9c8"
          title="Formulaire de contact"
          width="100%"
        />
      </Box>
    </>
  );
}

export default ContactPage;

export function Head({ data: { site, datoCmsContact } }: HeadProps<Queries.ContactQuery>) {
  const { title, description, url } = useHead({
    data: { title: datoCmsContact?.hero?.title, description: datoCmsContact?.hero?.subtitle },
    site,
  });
  const imageUrl = datoCmsContact?.metaImage?.url;

  return (
    <CommonHead
      description={description}
      imageUrl={imageUrl}
      title={title}
      url={`${url}/contact`}
    />
  );
}

export const query = graphql`
  fragment ContactQuery on DatoCmsContact {
    metaImage {
      url
    }
    hero {
      ...Hero
    }
  }
  query Contact {
    site {
      ...GatsbySite
    }
    datoCmsContact {
      ...ContactQuery
    }
  }
`;
