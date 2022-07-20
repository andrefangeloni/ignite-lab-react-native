import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Details } from '../screens/Details';
import { Home } from '../screens/Home';
import { Register } from '../screens/Register';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Screen name="Home" component={Home} />
    <Screen name="Details" component={Details} />
    <Screen name="Register" component={Register} />
  </Navigator>
);
