import React from 'react';
import { SignOut } from 'phosphor-react-native';
import {
  VStack,
  HStack,
  IconButton,
  useTheme,
  Text,
  Heading,
} from 'native-base';

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';

export const Home = () => {
  const { colors } = useTheme();

  const [statusSelected, setStatusSelected] = React.useState<'open' | 'closed'>(
    'open',
  );

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Meus chamados</Heading>

          <Text color="gray.200">3</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            isActive={statusSelected === 'open'}
            onPress={() => setStatusSelected('open')}
          />

          <Filter
            type="closed"
            title="finalizados"
            isActive={statusSelected === 'closed'}
            onPress={() => setStatusSelected('closed')}
          />
        </HStack>
      </VStack>
    </VStack>
  );
};
