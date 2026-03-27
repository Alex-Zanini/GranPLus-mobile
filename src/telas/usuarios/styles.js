import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F9',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  linha: {
    flexDirection: 'row',
    gap: 10,
  },
  campo: {
    marginBottom: 10,
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
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
  },
  botaoPrimario: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  botaoPrimarioTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  botaoSecundario: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  botaoSecundarioTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  item: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
  },
  itemTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  itemTexto: {
    fontSize: 13,
    color: '#475569',
    marginTop: 2,
  },
  semItens: {
    color: '#64748B',
    fontSize: 13,
    fontStyle: 'italic',
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  resumoLabel: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '600',
  },
  resumoValor: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
  destaque: {
    color: '#2563EB',
  },
});

export default styles;
