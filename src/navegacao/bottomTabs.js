import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

<<<<<<< main
import Home from '../telas/home';
import Entradas from '../telas/entradas';
import Saidas from '../telas/saidas';
import Estoque from '../telas/estoque';
=======
import Dashboard from '../telas/dashboard';
import Estoque from '../telas/estoque';
import Produtos from '../telas/produtos';
import entrada_produtos from '../telas/entradaDeProdutos';
import Usuarios from '../telas/usuarios';
>>>>>>> master

export default function MyTabs({ route }) {
    const Tab = createBottomTabNavigator();
<<<<<<< main
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Estoque" component={Estoque} />
            <Tab.Screen name="Entradas" component={Entradas} />
            <Tab.Screen name="Saidas" component={Saidas} />
        </Tab.Navigator>
    );
=======
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
>>>>>>> master
}