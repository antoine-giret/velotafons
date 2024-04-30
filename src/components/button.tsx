import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { ReactElement, ReactNode, RefObject } from 'react';

export function Button({
  buttonRef,
  colorScheme,
  size,
  LeftIcon,
  children,
  ...props
}: {
  buttonRef?: RefObject<HTMLButtonElement>;
  colorScheme: 'whiteAlpha' | 'primary';
  children: ReactNode;
  LeftIcon?: ReactElement;
  size?: 'md';
} & (
  | { externalLink: true; href: string }
  | { link: true; to: string }
  | { onClick: () => void }
)): JSX.Element {
  let commonsProps: ButtonProps = {
    fontSize: 'md',
    leftIcon: LeftIcon,
    size: size || 'sm',
  };

  if (colorScheme === 'whiteAlpha') {
    commonsProps = {
      ...commonsProps,
      _active: { bgColor: 'rgba(255, 255, 255, 0.2)' },
      _hover: { bgColor: 'rgba(255, 255, 255, 0.1)' },
      color: '#fff',
      variant: 'ghost',
    };
  } else {
    commonsProps.colorScheme = colorScheme;
  }

  if ('externalLink' in props) {
    return (
      <ChakraButton {...commonsProps} as="a" href={props.href} target="_blank">
        {children}
      </ChakraButton>
    );
  }

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
