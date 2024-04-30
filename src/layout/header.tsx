import {
  Box,
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { useRef } from 'react';
import { IoMenu } from 'react-icons/io5';

import { Button, IconButton } from '../components';
import icon from '../images/icon-inline.svg';

import { links, socialLinks } from './links';

function Header(): JSX.Element {
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Box
        alignItems="center"
        bgColor="primary.500"
        display="flex"
        flexDirection="row"
        flexShrink={0}
        gap={3}
        height={54}
        justifyContent="space-between"
        left={0}
        paddingX={3}
        position="fixed"
        top={0}
        width="100%"
        zIndex={1300}
      >
        <Link to="/">
          <img alt="Logo Vélotafons !" height="32px" src={icon} />
        </Link>
        <Box alignItems="center" as="nav" display={['none', 'none', 'flex']} gap={1}>
          {links
            .filter(({ key }) => key !== 'home')
            .map(({ key, to, label }) => (
              <Button link colorScheme="whiteAlpha" key={key} to={to}>
                {label}
              </Button>
            ))}
          {socialLinks.map(({ key, Icon, label, href }) => (
            <IconButton externalLink href={href} Icon={Icon} key={key} label={label} />
          ))}
        </Box>
        <Box display={['block', 'block', 'none']}>
          <Button
            buttonRef={menuButtonRef}
            colorScheme="whiteAlpha"
            LeftIcon={<IoMenu />}
            onClick={onMenuOpen}
          >
            Menu
          </Button>
        </Box>
      </Box>
      <Box height={54} width="100%" />
      <Drawer
        finalFocusRef={menuButtonRef}
        isOpen={isMenuOpen}
        onClose={onMenuClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="md" />
          <DrawerHeader fontSize="md">Menu</DrawerHeader>
          <DrawerBody>
            <Box as="nav" display="flex" flexDirection="column" gap={1}>
              {links.map(({ key, to, label }) => (
                <ChakraLink as={Link} key={key} to={to}>
                  {label}
                </ChakraLink>
              ))}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
