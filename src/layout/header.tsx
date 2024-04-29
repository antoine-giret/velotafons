import { Box } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React from 'react';
import { IoMenu } from 'react-icons/io5';

import { Button, IconButton } from '../components';
import icon from '../images/icon-inline.svg';

import { links, socialLinks } from './links';

function Header(): JSX.Element {
  return (
    <Box
      alignItems="center"
      bgColor="primary.500"
      display="flex"
      flexDirection="row"
      flexShrink={0}
      gap={3}
      height={54}
      justifyContent="space-between"
      paddingX={3}
    >
      <Link to="/">
        <img alt="Logo Vélotafons !" height="32px" src={icon} />
      </Link>
      <Box alignItems="center" as="nav" display={['none', 'none', 'flex']} gap={1}>
        {links
          .filter(({ key }) => key !== 'home')
          .map(({ key, to, label }) => (
            <Button link key={key} to={to}>
              {label}
            </Button>
          ))}
        {socialLinks.map(({ key, Icon, label, href }) => (
          <IconButton externalLink href={href} Icon={Icon} key={key} label={label} />
        ))}
      </Box>
      <Box display={['block', 'block', 'none']}>
        <IconButton Icon={IoMenu} label="Menu" onClick={() => undefined} />
      </Box>
    </Box>
  );
}

export default Header;
