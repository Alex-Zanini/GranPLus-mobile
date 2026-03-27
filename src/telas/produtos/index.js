import {View, Text, TextInput} from "react-native";
import { useState } from 'react';

export default function Entradas(){

    const [produto, setProduto] = useState('');

    return (
        <View>
            <Text>Produtos</Text>

            <TextInput 
            placeholder="Digite o produto"
            onChangeText={setProduto}
            value={produto}
            />
        </View>
    )
}