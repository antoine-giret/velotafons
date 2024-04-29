import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { ReactElement, ReactNode, RefObject } from 'react';

export function Button({
  buttonRef,
  LeftIcon,
  children,
  ...props
}: {
  buttonRef?: RefObject<HTMLButtonElement>;
  children: ReactNode;
  LeftIcon?: ReactElement;
} & ({ link: true; to: string } | { onClick: () => void })): JSX.Element {
  const commonsProps: ButtonProps = {
    _active: { bgColor: 'rgba(255, 255, 255, 0.2)' },
    _hover: { bgColor: 'rgba(255, 255, 255, 0.1)' },
    color: '#fff',
    fontSize: 'md',
    leftIcon: LeftIcon,
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
    <ChakraButton {...commonsProps} onClick={props.onClick} ref={buttonRef}>
      {children}
    </ChakraButton>
  );
}
