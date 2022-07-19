import {
  HStack,
  Heading,
  useTheme,
  IconButton,
  StyledProps,
} from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
  title: string;
};

export const Header = ({ title, ...rest }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pb={6}
      pt={4}
      {...rest}
    >
      <Heading
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        flex={1}
        mt={2}
      >
        {title}
      </Heading>

      <IconButton
        position="absolute"
        onPress={() => navigation.goBack()}
        icon={<CaretLeft size={24} color={colors.gray[200]} />}
      />
    </HStack>
  );
};
