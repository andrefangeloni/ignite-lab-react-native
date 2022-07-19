import { VStack } from 'native-base';

import { Header } from '../components/Header';

export const Details = () => {
  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />
    </VStack>
  );
};
