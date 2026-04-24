import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 20,
    marginTop: 10,
  },
  topBar: {
    marginBottom: 10,
  },
  inputBusca: {
    height: 45,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  botaoNovo: {
    backgroundColor: '#3498db', // Azul da sua tela web
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 45,
    marginBottom: 20,
  },
  textoBotaoNovo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
    flex: 1,
    marginRight: 10,
  },
  quantidadeContainer: {
    backgroundColor: '#f1f2f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  quantidadeTexto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtdZero: {
    color: '#2ecc71', // Na sua foto o zero está verde, mantive igual!
  },
  qtdPositiva: {
    color: '#2ecc71', 
  },
  cardBody: {
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#636e72',
  },
  bold: {
    fontWeight: 'bold',
    color: '#2d3436',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f1f2f6',
    paddingTop: 10,
  },
  botaoAjustar: {
    backgroundColor: '#f39c12', // Laranja do botão Ajustar
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  textoBotaoAcao: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
  },
  modalNomeProduto: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2d3436',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  botaoCancelar: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textoBotaoCancelar: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoSalvar: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotaoSalvar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default styles;