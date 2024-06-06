import { ChakraBaseProvider } from '@chakra-ui/react';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { WrapPageElementBrowserArgs, WrapRootElementBrowserArgs } from 'gatsby';
import React from 'react';

import Layout from './src/layout';
import theme from './src/theme';

const app = initializeApp({
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: 'asso-velotafons.firebaseapp.com',
  projectId: 'asso-velotafons',
  storageBucket: 'asso-velotafons.appspot.com',
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
});

getAnalytics(app);

export function wrapPageElement(props: WrapPageElementBrowserArgs) {
  return <Layout {...props} />;
}

export function wrapRootElement({ element }: WrapRootElementBrowserArgs) {
  return <ChakraBaseProvider theme={theme}>{element}</ChakraBaseProvider>;
}
