import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../telas/dashboard';
import Estoque from '../telas/estoque';
import Produtos from '../telas/produtos';
import Usuarios from '../telas/usuarios';

export default function MyTabs() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Estoque" component={Estoque} />
      <Tab.Screen name="Produtos" component={Produtos} />
      <Tab.Screen name="Usuarios" component={Usuarios} />
    </Tab.Navigator>
  );
}