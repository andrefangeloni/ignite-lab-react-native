import { Center, Spinner } from 'native-base';

export const Loading = () => (
  <Center flex={1} bg="gray.700">
    <Spinner color="secondary.700" />
  </Center>
);
