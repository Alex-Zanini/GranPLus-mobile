import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F1F5F9',
		padding: 16,
	},
	titulo: {
		fontSize: 24,
		fontWeight: '700',
		color: '#0F172A',
		marginBottom: 8,
	},
	subtitulo: {
		fontSize: 14,
		color: '#334155',
		marginBottom: 16,
	},
	lista: {
		paddingBottom: 24,
	},
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		padding: 14,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: '#E2E8F0',
	},
	novoButton: {
		backgroundColor: '#2563EB',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 10,
		alignItems: 'center',
		marginBottom: 16,
	},
	novoButtonText: {
		color: '#FFFFFF',
		fontWeight: '700',
	},
	nome: {
		fontSize: 17,
		fontWeight: '700',
		color: '#1E293B',
		marginBottom: 6,
	},
	linha: {
		fontSize: 14,
		color: '#475569',
		marginBottom: 4,
	},
	centerBox: {
		marginTop: 36,
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoText: {
		marginTop: 10,
		color: '#475569',
		fontSize: 14,
	},
	erroText: {
		color: '#B91C1C',
		fontSize: 14,
		textAlign: 'center',
		marginBottom: 12,
	},
	retryButton: {
		backgroundColor: '#2563EB',
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 8,
	},
	retryButtonText: {
		color: '#FFFFFF',
		fontWeight: '600',
	},
	actionButton: {
		marginTop: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	editButton: {
		backgroundColor: '#0F766E',
	},
	deleteButton: {
		backgroundColor: '#B91C1C',
	},
	actionButtonText: {
		color: '#FFFFFF',
		fontWeight: '700',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(15, 23, 42, 0.55)',
		justifyContent: 'center',
		padding: 16,
	},
	modalCard: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 16,
		maxHeight: '90%',
	},
	modalTitulo: {
		fontSize: 20,
		fontWeight: '700',
		color: '#0F172A',
		marginBottom: 16,
	},
	labelFormulario: {
		fontSize: 13,
		fontWeight: '600',
		color: '#334155',
		marginBottom: 6,
		marginTop: 8,
	},
	inputFormulario: {
		borderWidth: 1,
		borderColor: '#CBD5E1',
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 15,
		color: '#0F172A',
		backgroundColor: '#F8FAFC',
	},
	modalAcoes: {
		flexDirection: 'row',
		gap: 12,
		marginTop: 18,
	},
	botaoPrimario: {
		flex: 1,
		backgroundColor: '#2563EB',
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: 'center',
	},
	botaoPrimarioTexto: {
		color: '#FFFFFF',
		fontWeight: '700',
	},
	botaoSecundario: {
		flex: 1,
		backgroundColor: '#E2E8F0',
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: 'center',
	},
	botaoSecundarioTexto: {
		color: '#0F172A',
		fontWeight: '700',
	},
	botaoDesabilitado: {
		opacity: 0.65,
	},
});

export default styles;
