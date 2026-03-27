import { useMemo, useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import styles from './styles';

const fornecedoresMock = [
    { fncd_id: '1', fncd_nome: 'Super Distribuidora LTDA' },
    { fncd_id: '2', fncd_nome: 'Mercantil São Paulo' },
    { fncd_id: '3', fncd_nome: 'Central de Alimentos BR' },
];

const localizacoesMock = [
    { loc_id: '1', loc_nome: 'Depósito A' },
    { loc_id: '2', loc_nome: 'Câmara Fria' },
    { loc_id: '3', loc_nome: 'Loja Principal' },
];

const produtosMock = [
    { pdt_id: '101', pdt_nome: 'Arroz 5kg', pdt_preco: 28.5 },
    { pdt_id: '102', pdt_nome: 'Feijão 1kg', pdt_preco: 7.9 },
    { pdt_id: '103', pdt_nome: 'Óleo 900ml', pdt_preco: 6.75 },
    { pdt_id: '104', pdt_nome: 'Açúcar 1kg', pdt_preco: 4.95 },
];

function moeda(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

function hojeISO() {
    return new Date().toISOString().slice(0, 10);
}

export default function Entradas(){

    const [locId, setLocId] = useState('1');
    const [fncdId, setFncdId] = useState('1');
    const [entDataCompra, setEntDataCompra] = useState(hojeISO());

    const [pdtId, setPdtId] = useState('101');
    const [entProdQtde, setEntProdQtde] = useState('1');
    const [entProdLote, setEntProdLote] = useState('');
    const [entProdValidade, setEntProdValidade] = useState('');

    const [itensEntrada, setItensEntrada] = useState([]);

    const valorTotal = useMemo(() => {
        return itensEntrada.reduce((acc, item) => acc + item.subtotal, 0);
    }, [itensEntrada]);

    const totalItens = useMemo(() => {
        return itensEntrada.reduce((acc, item) => acc + item.quantidade, 0);
    }, [itensEntrada]);

    function adicionarItem() {
        const produto = produtosMock.find(p => p.pdt_id === pdtId);
        const quantidade = Number(entProdQtde);

        if (!produto) {
            Alert.alert('Produto inválido', 'Informe um ID de produto existente.');
            return;
        }

        if (!Number.isFinite(quantidade) || quantidade <= 0) {
            Alert.alert('Quantidade inválida', 'A quantidade deve ser maior que zero.');
            return;
        }

        const novoItem = {
            id: `${Date.now()}-${Math.random()}`,
            pdt_id: produto.pdt_id,
            pdt_nome: produto.pdt_nome,
            quantidade,
            lote: entProdLote || 'Sem lote',
            validade: entProdValidade || 'Não informada',
            valor_unitario: produto.pdt_preco,
            subtotal: produto.pdt_preco * quantidade,
        };

        setItensEntrada(prev => [...prev, novoItem]);
        setEntProdQtde('1');
        setEntProdLote('');
        setEntProdValidade('');
    }

    function salvarEntrada() {
        if (!locId || !fncdId || !entDataCompra) {
            Alert.alert('Campos obrigatórios', 'Preencha localização, fornecedor e data.');
            return;
        }

        if (itensEntrada.length === 0) {
            Alert.alert('Sem produtos', 'Adicione ao menos um item na entrada.');
            return;
        }

        const payload = {
            entrada: {
                loc_id: Number(locId),
                fncd_id: Number(fncdId),
                ent_data_compra: entDataCompra,
                ent_valor_compra: Number(valorTotal.toFixed(2)),
            },
            entrada_produtos: itensEntrada.map(item => ({
                pdt_id: Number(item.pdt_id),
                ent_prod_qtde: item.quantidade,
                ent_prod_lote: item.lote,
            })),
        };

        Alert.alert(
            'Entrada pronta para envio',
            `Fornecedor: ${fornecedorAtual?.fncd_nome}\nItens: ${itensEntrada.length}\nTotal: ${moeda(valorTotal)}`
        );

        console.log('Payload entrada:', payload);
    }

    const fornecedorAtual = fornecedoresMock.find(f => f.fncd_id === fncdId);
    const localizacaoAtual = localizacoesMock.find(l => l.loc_id === locId);
    const produtoAtual = produtosMock.find(p => p.pdt_id === pdtId);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.titulo}>Entrada de Produtos</Text>
            <Text style={styles.subtitulo}>
                Preencha os dados da entrada e adicione os produtos.
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitulo}>Dados da entrada</Text>

                <View style={styles.campo}>
                    <Text style={styles.label}>localização</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={locId}
                        onChangeText={setLocId}
                        placeholder="Ex.: 1"
                    />
                    <Text style={styles.itemTexto}>
                        Atual: {localizacaoAtual?.loc_nome || 'Não encontrada'}
                    </Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fornecedor</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={fncdId}
                        onChangeText={setFncdId}
                        placeholder="Ex.: 1"
                    />
                    <Text style={styles.itemTexto}>
                        Atual: {fornecedorAtual?.fncd_nome || 'Não encontrado'}
                    </Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Data da compra</Text>
                    <TextInput
                        style={styles.input}
                        value={entDataCompra}
                        onChangeText={setEntDataCompra}
                        placeholder="AAAA-MM-DD"
                    />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitulo}>Adicionar item</Text>

                <View style={styles.campo}>
                    <Text style={styles.label}>Produto</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={pdtId}
                        onChangeText={setPdtId}
                        placeholder="Ex.: 101"
                    />
                    <Text style={styles.itemTexto}>
                        Produto: {produtoAtual?.pdt_nome || 'Não encontrado'} | Unitário:{' '}
                        {moeda(produtoAtual?.pdt_preco || 0)}
                    </Text>
                </View>

                <View style={styles.linha}>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Quantidade</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={entProdQtde}
                            onChangeText={setEntProdQtde}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Lote</Text>
                        <TextInput
                            style={styles.input}
                            value={entProdLote}
                            onChangeText={setEntProdLote}
                            placeholder="Ex.: LT2403"
                        />
                    </View>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Validade (campo visual)</Text>
                    <TextInput
                        style={styles.input}
                        value={entProdValidade}
                        onChangeText={setEntProdValidade}
                        placeholder="Ex.: 2027-10-31"
                    />
                </View>

                <TouchableOpacity style={styles.botaoSecundario} onPress={adicionarItem}>
                    <Text style={styles.botaoSecundarioTexto}>Adicionar produto à entrada</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitulo}>Itens da entrada</Text>

                {itensEntrada.length === 0 ? (
                    <Text style={styles.semItens}>Nenhum item adicionado ainda.</Text>
                ) : (
                    itensEntrada.map(item => (
                        <View style={styles.item} key={item.id}>
                            <Text style={styles.itemTitulo}>
                                {item.pdt_nome} (ID: {item.pdt_id})
                            </Text>
                            <Text style={styles.itemTexto}>Qtd: {item.quantidade}</Text>
                            <Text style={styles.itemTexto}>Lote: {item.lote}</Text>
                            <Text style={styles.itemTexto}>Validade: {item.validade}</Text>
                            <Text style={styles.itemTexto}>
                                Subtotal: <Text style={styles.destaque}>{moeda(item.subtotal)}</Text>
                            </Text>
                        </View>
                    ))
                )}

                <View style={styles.resumoLinha}>
                    <Text style={styles.resumoLabel}>Quantidade total</Text>
                    <Text style={styles.resumoValor}>{totalItens}</Text>
                </View>

                <View style={styles.resumoLinha}>
                    <Text style={styles.resumoLabel}>Valor total (`ent_valor_compra`)</Text>
                    <Text style={[styles.resumoValor, styles.destaque]}>{moeda(valorTotal)}</Text>
                </View>

                <TouchableOpacity style={styles.botaoPrimario} onPress={salvarEntrada}>
                    <Text style={styles.botaoPrimarioTexto}>Salvar entrada</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}