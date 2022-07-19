import { Text, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { Header } from '../components/Header';

type RouteParams = {
  orderId: string;
}

export const Details = () => {
  const route = useRoute();
  const { orderId } =route.params as RouteParams;

  return (
    <VStack flex={1} pt={6} bg="gray.700">
      <Header title="Solicitação" />
      <Text color="white">{orderId}</Text>
    </VStack>
  );
};
