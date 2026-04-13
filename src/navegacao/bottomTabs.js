import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../telas/dashboard';
import Estoque from '../telas/estoque';
import Produtos from '../telas/produtos';
import entrada_produtos from '../telas/entradaDeProdutos';
import Usuarios from '../telas/usuarios';

export default function MyTabs({ route }) {
    const Tab = createBottomTabNavigator();
    const auth = route?.params?.auth;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} initialParams={{ auth }} />
      <Tab.Screen name="Estoque" component={Estoque} />
      <Tab.Screen name="Produtos" component={Produtos} />
      <Tab.Screen name="Entrada" component={entrada_produtos} />
      <Tab.Screen name="Usuários" component={Usuarios} initialParams={{ auth }} />
    </Tab.Navigator>
  );
}