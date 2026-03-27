import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../telas/login';
import MainTabs from './bottomTabs';



const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

