import { useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';

const produtosMock = [
  {
    id: '1',
    pdt_nome: 'Detergente Neutro 5L',
    pdt_codigo: 'DET-5L',
    pdt_descricao: 'Detergente concentrado para limpeza geral.',
    pdt_estoque_minimo: 10,
    pdt_ativo: 1,
    cat_id: 3,
    unid_med_id: 2,
  },
  {
    id: '2',
    pdt_nome: 'Papel A4 Chamex Caixa',
    pdt_codigo: 'PAP-A4',
    pdt_descricao: 'Caixa com folhas sulfite A4 75g.',
    pdt_estoque_minimo: 5,
    pdt_ativo: 1,
    cat_id: 4,
    unid_med_id: 1,
  },
  {
    id: '3',
    pdt_nome: 'Mouse Óptico USB',
    pdt_codigo: 'MOU-USB',
    pdt_descricao: 'Mouse ergonômico com conexão USB.',
    pdt_estoque_minimo: 8,
    pdt_ativo: 1,
    cat_id: 5,
    unid_med_id: 1,
  },
  {
    id: '4',
    pdt_nome: 'Café Torrado 500g',
    pdt_codigo: 'CAF-500',
    pdt_descricao: 'Café torrado e moído pacote 500g.',
    pdt_estoque_minimo: 15,
    pdt_ativo: 1,
    cat_id: 2,
    unid_med_id: 3,
  },
  {
    id: '5',
    pdt_nome: 'Álcool 70% 1L',
    pdt_codigo: 'ALC-1L',
    pdt_descricao: 'Álcool etílico 70% para assepsia.',
    pdt_estoque_minimo: 20,
    pdt_ativo: 0,
    cat_id: 3,
    unid_med_id: 2,
  },
];

const formularioInicial = {
  pdt_nome: '',
  pdt_codigo: '',
  pdt_descricao: '',
  pdt_estoque_minimo: '',
  pdt_ativo: '1',
  cat_id: '',
  unid_med_id: '',
};

export default function Produtos() {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState(
    produtosMock.map(produto => ({
      ...produto,
      pdt_ativo: produto.pdt_ativo ?? 1,
    }))
  );
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modoFormulario, setModoFormulario] = useState('novo');
  const [produtoEditandoId, setProdutoEditandoId] = useState(null);
  const [formProduto, setFormProduto] = useState(formularioInicial);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return produtos;
    }

    return produtos.filter(
      p =>
        p.pdt_nome.toLowerCase().includes(termo) ||
        p.pdt_codigo.toLowerCase().includes(termo) ||
        p.pdt_descricao.toLowerCase().includes(termo)
    );
  }, [busca, produtos]);

  function atualizarCampo(campo, valor) {
    setFormProduto(prev => ({ ...prev, [campo]: valor }));
  }

  function fecharFormulario() {
    setModalVisivel(false);
    setProdutoEditandoId(null);
    setFormProduto(formularioInicial);
  }

  function abrirNovoProduto() {
    setModoFormulario('novo');
    setProdutoEditandoId(null);
    setFormProduto(formularioInicial);
    setModalVisivel(true);
  }

  function editarProduto(produto) {
    setModoFormulario('editar');
    setProdutoEditandoId(produto.id);
    setFormProduto({
      pdt_nome: produto.pdt_nome,
      pdt_codigo: produto.pdt_codigo,
      pdt_descricao: produto.pdt_descricao,
      pdt_estoque_minimo: String(produto.pdt_estoque_minimo),
      pdt_ativo: String(produto.pdt_ativo ?? 1),
      cat_id: String(produto.cat_id),
      unid_med_id: String(produto.unid_med_id),
    });
    setModalVisivel(true);
  }

  function removerProduto(produto) {
    Alert.alert(
      'Remover produto',
      `Deseja remover ${produto.pdt_nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setProdutos(prev => prev.filter(item => item.id !== produto.id));
          },
        },
      ]
    );
  }

  function salvarProduto() {
    const pdt_nome = formProduto.pdt_nome.trim();
    const pdt_codigo = formProduto.pdt_codigo.trim();
    const pdt_descricao = formProduto.pdt_descricao.trim();
    const pdt_estoque_minimo = Number(formProduto.pdt_estoque_minimo);
    const cat_id = Number(formProduto.cat_id);
    const unid_med_id = Number(formProduto.unid_med_id);
    const pdt_ativo =
      formProduto.pdt_ativo === '' || formProduto.pdt_ativo === null
        ? 1
        : Number(formProduto.pdt_ativo);

    if (!pdt_nome || !pdt_codigo || !pdt_descricao) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos .');
      return;
    }

    if (!Number.isFinite(pdt_estoque_minimo) || pdt_estoque_minimo < 0) {
      Alert.alert('Estoque inválido', 'Informe um estoque mínimo válido (0 ou maior).');
      return;
    }

    if (!Number.isFinite(cat_id) || cat_id <= 0) {
      Alert.alert('Categoria inválida', 'Informe um cat_id válido.');
      return;
    }

    if (!Number.isFinite(unid_med_id) || unid_med_id <= 0) {
      Alert.alert('Unidade inválida', 'Informe um unid_med_id válido.');
      return;
    }

    if (![0, 1].includes(pdt_ativo)) {
      Alert.alert('Status inválido', 'O campo pdt_ativo deve ser 0 ou 1.');
      return;
    }

    const payloadProduto = {
      pdt_nome,
      pdt_codigo,
      pdt_descricao,
      pdt_estoque_minimo,
      pdt_ativo,
      cat_id,
      unid_med_id,
    };

    if (modoFormulario === 'novo') {
      setProdutos(prev => [{ id: `${Date.now()}`, ...payloadProduto }, ...prev]);
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso.');
    } else {
      setProdutos(prev =>
        prev.map(item =>
          item.id === produtoEditandoId ? { ...item, ...payloadProduto } : item
        )
      );
      Alert.alert('Sucesso', 'Produto atualizado com sucesso.');
    }

    fecharFormulario();
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>Gestão de Produtos</Text>
        <Text style={styles.subtitulo}>Consulte, busque e gerencie o cadastro de produtos.</Text>

        <TextInput
          style={styles.input}
          placeholder="Buscar por nome ou código"
          value={busca}
          onChangeText={setBusca}
          placeholderTextColor="#94A3B8"
        />

        {filtrados.length === 0 ? (
          <View style={styles.cardVazio}>
            <Text style={styles.vazioTexto}>Nenhum produto encontrado.</Text>
          </View>
        ) : (
          filtrados.map(produto => (
            <View key={produto.id} style={styles.card}>
              <Text style={styles.nomeProduto}>{produto.pdt_nome}</Text>
              <Text style={styles.infoProduto}>Código: {produto.pdt_codigo}</Text>
              <Text style={styles.infoProduto}>Descrição: {produto.pdt_descricao}</Text>
              <Text style={styles.infoProduto}>Estoque mínimo: {produto.pdt_estoque_minimo}</Text>
              <Text style={styles.infoProduto}>Categoria: {produto.cat_id}</Text>
              <Text style={styles.infoProduto}>Unidade de medida: {produto.unid_med_id}</Text>

              <View style={styles.statusLinha}>
                <View
                  style={[
                    styles.statusBadge,
                    produto.pdt_ativo ? styles.statusAtivo : styles.statusInativo,
                  ]}
                >
                  <Text style={styles.statusTexto}>
                    {produto.pdt_ativo ? 'Ativo' : 'Inativo'}
                  </Text>
                </View>
              </View>

              <View style={styles.acoes}>
                <TouchableOpacity
                  style={[styles.botaoAcao, styles.botaoEditar]}
                  onPress={() => editarProduto(produto)}
                >
                  <Text style={styles.botaoAcaoTexto}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botaoAcao, styles.botaoExcluir]}
                  onPress={() => removerProduto(produto)}
                >
                  <Text style={styles.botaoAcaoTexto}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.botaoFlutuante} onPress={abrirNovoProduto}>
        <Text style={styles.botaoFlutuanteTexto}>+ Novo</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={fecharFormulario}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>
              {modoFormulario === 'novo' ? 'Cadastrar Produto' : 'Editar Produto'}
            </Text>

            <ScrollView>
              <View style={styles.campoFormulario}>
                <Text style={styles.labelFormulario}>Nome</Text>
                <TextInput
                  style={styles.inputFormulario}
                  value={formProduto.pdt_nome}
                  onChangeText={valor => atualizarCampo('pdt_nome', valor)}
                  placeholder="Nome do produto"
                />
              </View>

              <View style={styles.campoFormulario}>
                <Text style={styles.labelFormulario}>Código</Text>
                <TextInput
                  style={styles.inputFormulario}
                  value={formProduto.pdt_codigo}
                  onChangeText={valor => atualizarCampo('pdt_codigo', valor)}
                  placeholder="Código do produto"
                />
              </View>

              <View style={styles.campoFormulario}>
                <Text style={styles.labelFormulario}>Descrição</Text>
                <TextInput
                  style={[styles.inputFormulario, styles.inputMultiline]}
                  value={formProduto.pdt_descricao}
                  onChangeText={valor => atualizarCampo('pdt_descricao', valor)}
                  placeholder="Descrição do produto"
                  multiline
                />
              </View>

              <View style={styles.campoFormulario}>
                <Text style={styles.labelFormulario}>Estoque Mínimo</Text>
                <TextInput
                  style={styles.inputFormulario}
                  value={formProduto.pdt_estoque_minimo}
                  onChangeText={valor => atualizarCampo('pdt_estoque_minimo', valor)}
                  placeholder="Ex.: 10"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.campoFormulario}>
                <Text style={styles.labelFormulario}>Ativo(1) ou Inativo (0)</Text>
                <TextInput
                  style={styles.inputFormulario}
                  value={formProduto.pdt_ativo}
                  onChangeText={valor => atualizarCampo('pdt_ativo', valor)}
                  placeholder="Padrão: 1"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.campoFormulario}>
                <Text style={styles.labelFormulario}>Categoria</Text>
                <TextInput
                  style={styles.inputFormulario}
                  value={formProduto.cat_id}
                  onChangeText={valor => atualizarCampo('cat_id', valor)}
                  placeholder="ID da categoria"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.campoFormulario}>
                <Text style={styles.labelFormulario}>Unidade de Medida</Text>
                <TextInput
                  style={styles.inputFormulario}
                  value={formProduto.unid_med_id}
                  onChangeText={valor => atualizarCampo('unid_med_id', valor)}
                  placeholder="ID da unidade de medida"
                  keyboardType="numeric"
                />
              </View>
            </ScrollView>

            <View style={styles.modalAcoes}>
              <TouchableOpacity
                style={[styles.botaoAcao, styles.botaoCancelar]}
                onPress={fecharFormulario}
              >
                <Text style={styles.botaoAcaoTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botaoAcao, styles.botaoSalvar]}
                onPress={salvarProduto}
              >
                <Text style={styles.botaoAcaoTexto}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}