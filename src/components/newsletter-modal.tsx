import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import showdown from 'showdown';

import { Links } from '.';

const converter = new showdown.Converter({ simpleLineBreaks: true });

export function NewsletterModal({
  open,
  onClose,
}: {
  onClose: () => void;
  open: boolean;
}): JSX.Element {
  const { datoCmsNewsletter } = useStaticQuery<Queries.NewsletterModalQuery>(graphql`
    fragment Newsletter on DatoCmsNewsletter {
      title
      description
      link {
        ...ExternalLink
      }
    }
    query NewsletterModal {
      datoCmsNewsletter {
        ...Newsletter
      }
    }
  `);

  useEffect(() => {
    if (open && typeof window !== 'undefined') {
      try {
        localStorage.setItem('newsletterModalDisplayed', 'true');
      } catch (err) {
        console.error(err);
      }
    }
  }, [open]);

  if (!datoCmsNewsletter) return <></>;
  const { title, description, link } = datoCmsNewsletter;

  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      closeOnOverlayClick={false}
      isOpen={open}
      onClose={onClose}
      scrollBehavior="inside"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent sx={{ width: '90%' }}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {description && (
          <ModalBody sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Text as="div" dangerouslySetInnerHTML={{ __html: converter.makeHtml(description) }} />
          </ModalBody>
        )}
        <ModalFooter>
          <Links links={link ? [link] : []} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
