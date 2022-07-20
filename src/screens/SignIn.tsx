import React from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Envelope, Key } from 'phosphor-react-native';
import { VStack, Heading, Icon, useTheme } from 'native-base';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const SignIn = () => {
  const { colors } = useTheme();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      return Alert.alert('Atenção', 'Informe e-mail e senha');
    }

    try {
      setIsLoading(true);

      await auth().signInWithEmailAndPassword(email, password);
    } catch (e: any) {
      switch (e.code) {
        case 'auth/invalid-email':
          return Alert.alert('Atenção', 'E-mail inválido');
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          return Alert.alert('Atenção', 'E-mail ou senha inválida');
        default:
          return Alert.alert('Erro inesperado', 'Tente novamente mais tarde');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        value={email}
        placeholder="E-mail"
        onChangeText={setEmail}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
      />
      <Input
        mb={8}
        value={password}
        secureTextEntry
        placeholder="Senha"
        onChangeText={setPassword}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
      />

      <Button
        w="full"
        title="Entrar"
        isLoading={isLoading}
        onPress={() => handleSignIn()}
      />
    </VStack>
  );
};
