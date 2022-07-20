import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Loading } from '../components/Loading';

import { SignIn } from '../screens/SignIn';

import { AppRoutes } from './app.routes';

export const Routes = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<FirebaseAuthTypes.User>();

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setUser(response);
      setIsLoading(false);
    });

    return subscriber;
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
