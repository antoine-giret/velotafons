import { ChakraBaseProvider } from '@chakra-ui/react';
import { RenderBodyArgs, WrapPageElementBrowserArgs, WrapRootElementBrowserArgs } from 'gatsby';
import React from 'react';

import Layout from './src/layout';
import theme from './src/theme';
import './src/style.css';

export function onRenderBody({ setHtmlAttributes }: RenderBodyArgs) {
  setHtmlAttributes({ lang: 'fr' });
}

export function wrapPageElement(props: WrapPageElementBrowserArgs) {
  return <Layout {...props} />;
}

export function wrapRootElement({ element }: WrapRootElementBrowserArgs) {
  return <ChakraBaseProvider theme={theme}>{element}</ChakraBaseProvider>;
}
