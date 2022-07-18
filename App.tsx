import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { SignIn } from './src/screens/SignIn';

import { THEME } from './src/styles/theme';

export const App = () => (
  <NativeBaseProvider theme={THEME}>
    <SignIn />
  </NativeBaseProvider>
);
