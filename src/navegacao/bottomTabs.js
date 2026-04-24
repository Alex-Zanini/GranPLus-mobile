import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../telas/home';
import Entradas from '../telas/entradas';
import Saidas from '../telas/saidas';
import Estoque from '../telas/estoque';

export default function MyTabs() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Estoque" component={Estoque} />
            <Tab.Screen name="Entradas" component={Entradas} />
            <Tab.Screen name="Saidas" component={Saidas} />
        </Tab.Navigator>
    );
}