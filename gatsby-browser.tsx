import { ChakraBaseProvider } from '@chakra-ui/react';
import { WrapPageElementBrowserArgs, WrapRootElementBrowserArgs } from 'gatsby';
import React from 'react';

import Layout from './src/layout';
import theme from './src/theme';

export function wrapPageElement(props: WrapPageElementBrowserArgs) {
  return <Layout {...props} />;
}

export function wrapRootElement({ element }: WrapRootElementBrowserArgs) {
  return <ChakraBaseProvider theme={theme}>{element}</ChakraBaseProvider>;
}
