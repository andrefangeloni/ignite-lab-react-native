import React from 'react';
import { Envelope, Key } from 'phosphor-react-native';
import { VStack, Heading, Icon, useTheme } from 'native-base';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const SignIn = () => {
  const { colors } = useTheme();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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

      <Button title="Entrar" w="full" />
    </VStack>
  );
};
