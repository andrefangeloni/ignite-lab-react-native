import React from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';

import {
  Text,
  Center,
  VStack,
  HStack,
  Heading,
  useTheme,
  FlatList,
  IconButton,
} from 'native-base';

import Logo from '../assets/logo_secondary.svg';

import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Loading } from '../components/Loading';
import { Order, OrderProps } from '../components/Order';

import { firestoreDateFormat } from '../utils/firestoreDateFormat';

export const Home = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = React.useState(false);
  const [orders, setOrders] = React.useState<OrderProps[]>([]);
  const [statusSelected, setStatusSelected] = React.useState<'open' | 'closed'>(
    'open',
  );

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (e: any) {
      Alert.alert('Erro inesperado', 'Tente novamente mais tarde');
    }
  };

  React.useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, status, created_at } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: firestoreDateFormat(created_at),
          };
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected]);

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

        <IconButton
          onPress={() => handleLogout()}
          icon={<SignOut size={26} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>

          <Text color="gray.200">{orders.length}</Text>
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

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            mb={4}
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order
                data={item}
                onPress={() =>
                  navigation.navigate('Details', { orderId: item.id })
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {'\n'}
                  solicitações{' '}
                  {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                </Text>
              </Center>
            )}
          />
        )}

        <Button
          title="Nova solicitação"
          onPress={() => navigation.navigate('Register')}
        />
      </VStack>
    </VStack>
  );
};
