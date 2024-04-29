import { IconButton as ChakraIconButton, IconButtonProps } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React from 'react';
import { IconType } from 'react-icons';

export function IconButton({
  Icon,
  label,
  ...props
}: { Icon: IconType; label: string } & (
  | { externalLink: true; href: string }
  | { link: true; to: string }
  | { onClick: () => void }
)): JSX.Element {
  const commonsProps: IconButtonProps = {
    isRound: true,
    _active: { bgColor: 'rgba(255, 255, 255, 0.2)' },
    _hover: { bgColor: 'rgba(255, 255, 255, 0.1)' },
    'aria-label': label,
    color: '#fff',
    fontSize: 'md',
    icon: <Icon />,
    size: 'sm',
    variant: 'ghost',
  };

  if ('externalLink' in props) {
    return <ChakraIconButton {...commonsProps} as="a" href={props.href} target="_blank" />;
  }

  if ('link' in props) {
    return <ChakraIconButton {...commonsProps} as={Link} to={props.to} />;
  }

  return <ChakraIconButton {...commonsProps} onClick={props.onClick} />;
}
