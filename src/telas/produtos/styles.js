import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F9',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  infoProduto: {
    fontSize: 14,
    color: '#475569',
    marginTop: 2,
  },
  statusLinha: {
    marginTop: 10,
    flexDirection: 'row',
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusAtivo: {
    backgroundColor: '#DCFCE7',
  },
  statusInativo: {
    backgroundColor: '#FEE2E2',
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  acoes: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  botaoAcao: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  botaoEditar: {
    backgroundColor: '#F59E0B',
  },
  botaoExcluir: {
    backgroundColor: '#EF4444',
  },
  botaoAcaoTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  cardVazio: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  vazioTexto: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 14,
  },
  botaoFlutuante: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    backgroundColor: '#16A34A',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  botaoFlutuanteTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    maxHeight: '90%',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  campoFormulario: {
    marginBottom: 10,
  },
  labelFormulario: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
    marginBottom: 4,
  },
  inputFormulario: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalAcoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 12,
  },
  botaoCancelar: {
    backgroundColor: '#64748B',
  },
  botaoSalvar: {
    backgroundColor: '#2563EB',
  },
});

export default styles;