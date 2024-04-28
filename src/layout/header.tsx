import { Box, Button, IconButton } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { IoLogoInstagram, IoLogoLinkedin, IoMenu } from 'react-icons/io5';

import icon from '../images/icon-inline.svg';

const links: Array<{ key: string; label: string }> = [
  { key: 'mission', label: 'Notre mission' },
  { key: 'blog', label: 'Blog' },
  { key: 'events', label: 'Évènements' },
  { key: 'contact', label: 'Contact' },
];

const socialLinks: Array<{ Icon: IconType; key: string; href: string; label: string }> = [
  {
    key: 'instagram',
    Icon: IoLogoInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/velotafons/',
  },
  {
    key: 'linkedin',
    Icon: IoLogoLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/velotafons/',
  },
];

function Header(): JSX.Element {
  return (
    <Box
      alignItems="center"
      bgColor="primary.500"
      display="flex"
      flexDirection="row"
      gap={3}
      height={54}
      justifyContent="space-between"
      paddingX={3}
    >
      <img height="32px" src={icon} />
      <Box alignItems="center" as="nav" display={['none', 'none', 'flex']} gap={1}>
        {links.map(({ key, label }) => (
          <Button
            _active={{ bgColor: 'rgba(255, 255, 255, 0.2)' }}
            _hover={{ bgColor: 'rgba(255, 255, 255, 0.1)' }}
            color="#fff"
            key={key}
            size="sm"
            variant="ghost"
          >
            {label}
          </Button>
        ))}
        {socialLinks.map(({ key, Icon, label, href }) => (
          <IconButton
            isRound
            _active={{ bgColor: 'rgba(255, 255, 255, 0.2)' }}
            _hover={{ bgColor: 'rgba(255, 255, 255, 0.1)' }}
            aria-label={label}
            as="a"
            color="#fff"
            href={href}
            icon={<Icon />}
            key={key}
            size="sm"
            target="_blank"
            variant="ghost"
          />
        ))}
      </Box>
      <Box display={['block', 'block', 'none']}>
        <IconButton
          isRound
          _active={{ bgColor: 'rgba(255, 255, 255, 0.2)' }}
          _hover={{ bgColor: 'rgba(255, 255, 255, 0.1)' }}
          aria-label="Menu"
          color="#fff"
          icon={<IoMenu />}
          onClick={() => undefined}
          variant="ghost"
        />
      </Box>
    </Box>
  );
}

export default Header;
