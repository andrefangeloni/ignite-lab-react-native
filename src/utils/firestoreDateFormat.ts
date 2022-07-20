import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const firestoreDateFormat = (
  timestamp: FirebaseFirestoreTypes.Timestamp,
) => {
  if (timestamp) {
    const date = new Date(timestamp.toDate());

    const day = date.toLocaleDateString('pt-BR');
    const hour = date.toLocaleTimeString('pt-BR');

    return `${day} às ${hour}h`;
  }
};
