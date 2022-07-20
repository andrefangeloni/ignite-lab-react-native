import React from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Text, VStack, useTheme, HStack, ScrollView } from 'native-base';
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
} from 'phosphor-react-native';

import { Input } from '../components/Input';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { OrderProps } from '../components/Order';
import { CardDetails } from '../components/CardDetails';

import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';

import { firestoreDateFormat } from '../utils/firestoreDateFormat';
import { Button } from '../components/Button';

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export const Details = () => {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const { colors } = useTheme();

  const [solution, setSolution] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [order, setOrder] = React.useState<OrderDetails>({} as OrderDetails);

  const getOrderById = React.useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await firestore()
        .collection<OrderFirestoreDTO>('orders')
        .doc(orderId)
        .get();

      const {
        status,
        solution,
        closed_at,
        patrimony,
        created_at,
        description,
      } = response.data();
      const closed = closed_at ? firestoreDateFormat(closed_at) : null;

      setOrder({
        closed,
        status,
        solution,
        patrimony,
        description,
        id: response.id,
        when: firestoreDateFormat(created_at),
      });
    } catch (e: any) {
      console.log(e.code);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getOrderById();
  }, [getOrderById]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} pt={6} bg="gray.700">
      <Header title="Solicitação" />

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          ml={2}
          fontSize="sm"
          textTransform="uppercase"
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          icon={DesktopTower}
          footer={order.when}
          description={`Patrimônio: ${order.patrimony}`}
        />

        <CardDetails
          icon={Clipboard}
          title="descrição do problema"
          description={order.description}
        />

        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          footer={order.closed ? `Encerrado em ${order.closed}` : null}
        >
          <Input
            h={24}
            multiline
            textAlignVertical="top"
            onChangeText={setSolution}
            placeholder="Descrição da solução"
          />
        </CardDetails>
      </ScrollView>

      {order.status === 'open' ? (
        <Button m={5} title="Encerrar solicitação" />
      ) : null}
    </VStack>
  );
};
