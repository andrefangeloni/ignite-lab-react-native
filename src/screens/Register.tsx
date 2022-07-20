import React from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

export const Register = () => {
  const navigation = useNavigation();

  const [patrimony, setPatrimony] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [description, setDescription] = React.useState('');

  const handleNewOrderRegister = async () => {
    if (!patrimony || !description) {
      return Alert.alert('Atenção', 'Preecha todos os campos.');
    }

    try {
      setIsLoading(true);

      await firestore().collection('orders').add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Sucesso', 'Solicitação registrada.');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Erro inesperado', 'Tente novamente mais tarde');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        value={patrimony}
        onChangeText={setPatrimony}
        placeholder="Descrição do patrimônio"
      />

      <Input
        mt={5}
        flex={1}
        multiline
        value={description}
        textAlignVertical="top"
        onChangeText={setDescription}
        placeholder="Descrição do problema"
      />

      <Button
        mt={5}
        title="Cadastrar"
        isLoading={isLoading}
        onPress={() => handleNewOrderRegister()}
      />
    </VStack>
  );
};
