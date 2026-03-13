import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "../telas/login"
import MyTabs from './bottomTabs';



const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
    </Stack.Navigator>
  );
}

