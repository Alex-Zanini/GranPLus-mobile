import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../telas/home'; 
import Entradas from '../telas/entradas';
import Produtos from '../telas/produtos';
import Saidas from '../telas/saidas';

export default function MyTabs() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Entradas" component={Entradas} />
      <Tab.Screen name="Produtos" component={Produtos} />
      <Tab.Screen name="Saidas" component={Saidas} />
    </Tab.Navigator>
  );
}