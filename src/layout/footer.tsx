import { Box, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React from 'react';

import { IconButton } from '../components';
import icon from '../images/icon-inline.svg';

import { links, socialLinks } from './links';

const now = new Date();

function Footer(): JSX.Element {
  return (
    <Box
      as="footer"
      bgColor="#333333"
      color="#fff"
      display="flex"
      flexDirection="column"
      flexShrink={0}
      gap={3}
      paddingX={[3, 3, 6]}
      paddingY={3}
    >
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        gap={3}
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <Text fontWeight={700}>Menu</Text>
          <Box as="nav" display="flex" flexDirection="column">
            {links.map(({ key, to, label }) => (
              <ChakraLink as={Link} key={key} to={to}>
                {label}
              </ChakraLink>
            ))}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap={2} width={['100%', '100%', 500]}>
          <Box>
            <img alt="Logo Vélotafons !" height="32px" src={icon} />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <Text>
              Vélotafons ! est une association à but non lucratif, ayant pour objet la promotion des
              mobilités douces et durables
            </Text>
            <Box display="flex" flexDirection="column">
              <ChakraLink
                href="https://velotafons.substack.com/"
                sx={{ textDecoration: 'underline' }}
                target="_blank"
              >
                Abonnez-vous à la newsletter
              </ChakraLink>
              <ChakraLink
                href="https://www.helloasso.com/associations/velotafons/adhesions/challenge-mobilite"
                sx={{ textDecoration: 'underline' }}
                target="_blank"
              >
                Adhérez à l'association
              </ChakraLink>
            </Box>
          </Box>
          <Box alignItems="center" display="flex" gap={1}>
            {socialLinks.map(({ key, Icon, label, href }) => (
              <IconButton externalLink href={href} Icon={Icon} key={key} label={label} />
            ))}
          </Box>
        </Box>
      </Box>
      <Box alignSelf="center">
        <Text>© Vélotafons ! {now.getFullYear()}</Text>
      </Box>
    </Box>
  );
}

export default Footer;
