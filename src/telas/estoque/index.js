import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import styles from './styles';

export default function Estoque() {
  const [busca, setBusca] = useState('');
  
  // 1. Agora o estoque inicial está dentro de um Estado, para a tela atualizar quando mudar!
  const [estoque, setEstoque] = useState([
    { id: '1', nome: 'Álcool 70% 1L', localizacao: 'Local não encontrado', quantidade: 0 },
    { id: '2', nome: 'Café Torrado 500g', localizacao: 'Local não encontrado', quantidade: 0 },
    { id: '3', nome: 'Detergente Neutro 5L', localizacao: 'Local não encontrado', quantidade: 0 },
    { id: '4', nome: 'Mouse Óptico USB', localizacao: 'Local não encontrado', quantidade: 0 },
    { id: '5', nome: 'Papel A4 Chamex Caixa', localizacao: 'Local não encontrado', quantidade: 0 },
  ]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [novaQuantidade, setNovaQuantidade] = useState('');

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
    setNovaQuantidade(String(produto.quantidade));
    setModalVisivel(true);
  };

  // 2. Aqui está a mágica: Atualiza a tela e já tem a rota da API engatilhada
  const salvarAjuste = async () => {
    try {
      /* ========================================================
         ESQUELETO DA API (Descomente quando for ligar o Back-end)
         ========================================================
         
      const token = await AsyncStorage.getItem('token'); // Se usar token depois
      
      const resposta = await fetch(`http://10.0.2.2:3333/estoque/${produtoSelecionado.id}`, {
        method: 'PUT', // ou PATCH, dependendo da sua API
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          quantidade: Number(novaQuantidade)
        })
      });

      if (!resposta.ok) {
        throw new Error('Erro ao atualizar no banco');
      }
      */

      // ========================================================
      // LÓGICA LOCAL (Faz a tela atualizar na hora para o usuário)
      // ========================================================
      
      const estoqueAtualizado = estoque.map(item => {
        // Se for o produto que estamos editando, altera a quantidade
        if (item.id === produtoSelecionado.id) {
          return { ...item, quantidade: Number(novaQuantidade) };
        }
        return item; // Se não for, mantém como estava
      });

      setEstoque(estoqueAtualizado); // Atualiza a lista na tela!
      setModalVisivel(false); // Fecha o modal
      
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o ajuste.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.nomeProduto}>{item.nome}</Text>
        <View style={styles.quantidadeContainer}>
          <Text style={[styles.quantidadeTexto, item.quantidade === 0 ? styles.qtdZero : styles.qtdPositiva]}>
            {item.quantidade}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Localização:</Text> {item.localizacao}
        </Text>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.botaoAjustar} onPress={() => abrirModal(item)}>
          <Text style={styles.textoBotaoAcao}>✏️ Ajustar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Controle de Estoque</Text>

      <View style={styles.topBar}>
        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar por produto ou local..."
          value={busca}
          onChangeText={setBusca}
        />
      </View>
      
      <TouchableOpacity style={styles.botaoNovo}>
        <Text style={styles.textoBotaoNovo}>+ Nova Movimentação</Text>
      </TouchableOpacity>

      <FlatList
        data={estoque} // Agora lê da variável de estado!
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent={true} visible={modalVisivel} animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Ajustar Estoque</Text>
            
            {produtoSelecionado && (
              <Text style={styles.modalNomeProduto}>{produtoSelecionado.nome}</Text>
            )}

            <Text style={styles.modalLabel}>Nova Quantidade:</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={novaQuantidade}
              onChangeText={setNovaQuantidade}
            />

            <View style={styles.modalBotoes}>
              <TouchableOpacity style={styles.botaoCancelar} onPress={() => setModalVisivel(false)}>
                <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAjuste}>
                <Text style={styles.textoBotaoSalvar}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}