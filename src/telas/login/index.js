import {View, Text, TouchableOpacity} from "react-native";
import {useNavigation} from '@react-navigation/native';

export default function Login(){
    const navigation = useNavigation();
    return (
        <View>
            <Text>Login</Text>
            <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
                <Text>Ir para o Dashboard</Text>
            </TouchableOpacity>
        </View>
    )
}