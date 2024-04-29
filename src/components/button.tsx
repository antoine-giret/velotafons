import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { ReactNode } from 'react';

export function Button({
  children,
  ...props
}: { children: ReactNode } & ({ link: true; to: string } | { onClick: () => void })): JSX.Element {
  const commonsProps: ButtonProps = {
    _active: { bgColor: 'rgba(255, 255, 255, 0.2)' },
    _hover: { bgColor: 'rgba(255, 255, 255, 0.1)' },
    color: '#fff',
    fontSize: 'md',
    size: 'sm',
    variant: 'ghost',
  };

  if ('link' in props) {
    return (
      <ChakraButton {...commonsProps} as={Link} to={props.to}>
        {children}
      </ChakraButton>
    );
  }

  return (
    <ChakraButton {...commonsProps} onClick={props.onClick}>
      {children}
    </ChakraButton>
  );
}
