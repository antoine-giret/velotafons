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
import React, { useEffect } from 'react';

import { Button } from '../components';

function NewsletterModal({ open, onClose }: { onClose: () => void; open: boolean }): JSX.Element {
  useEffect(() => {
    if (open && typeof window !== 'undefined') {
      try {
        localStorage.setItem('newsletterModalDisplayed', 'true');
      } catch (err) {
        console.error(err);
      }
    }
  }, [open]);

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
      <ModalContent>
        <ModalHeader>Abonnez-vous à la newsletter</ModalHeader>
        <ModalCloseButton />
        <ModalBody sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Text>
            On y parlera d'actualités liées au vélo(taf), des bonnes pratiques et conseils de
            saison. Mais aussi de mettre en avant les vélotafeurs·euses et leurs initiatives ! 🚲
          </Text>
          <Text>Une seule fois par mois, c'est promis. Abonnez-vous ! 👇</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            externalLink
            colorScheme="primary"
            href="https://velotafons.substack.com/"
            size="md"
          >
            S'abonner
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewsletterModal;
