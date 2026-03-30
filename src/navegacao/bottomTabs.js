import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../telas/dashboard';
import Produtos from '../telas/produtos';
import Estoque from '../telas/estoque';
import Usuarios from '../telas/usuarios';

const Tab = createBottomTabNavigator();

const estiloBotaoTab = {
  tabBarItemStyle: {
    marginHorizontal: 4,
    borderRadius: 10,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
  },
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={estiloBotaoTab} />
      <Tab.Screen name="Produtos" component={Produtos} options={estiloBotaoTab} />
      <Tab.Screen name="Estoque" component={Estoque} options={estiloBotaoTab} />
      <Tab.Screen name="Usuarios" component={Usuarios} options={estiloBotaoTab} />
    </Tab.Navigator>
  );
}