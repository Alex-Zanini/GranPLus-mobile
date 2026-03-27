import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../telas/dashboard';
import Produtos from '../telas/produtos';
import Estoque from '../telas/estoque';
import Usuarios from '../telas/usuarios';
const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Produtos" component={Produtos} />
      <Tab.Screen name="Estoque" component={Estoque} />
      <Tab.Screen name="Usuarios" component={Usuarios} />
    </Tab.Navigator>
  );
}