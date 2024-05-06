import { ButtonProps, Button as ChakraButton, ResponsiveValue } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React, { ReactNode, RefObject } from 'react';

export function Button({
  buttonRef,
  colorScheme,
  size,
  variant,
  children,
  ...props
}: {
  buttonRef?: RefObject<HTMLButtonElement>;
  colorScheme: 'whiteAlpha' | 'primary';
  children: ReactNode;
  size?: ResponsiveValue<string>;
  variant?: string;
} & (
  | { externalLink: true; href: string }
  | { link: true; to: string }
  | { onClick: () => void }
)): JSX.Element {
  let commonsProps: ButtonProps = {
    fontSize: 'md',
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
    commonsProps = {
      ...commonsProps,
      colorScheme,
      color: variant === 'outlined' ? 'primary.500' : undefined,
      variant: variant === 'outlined' ? 'outline' : 'solid',
    };
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
