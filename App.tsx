import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading';

import { Routes } from './src/routes';

import { THEME } from './src/styles/theme';

export const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
};
