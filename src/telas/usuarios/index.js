import React, { useCallback, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	RefreshControl,
	Alert,
	Modal,
	ScrollView,
	TextInput,
	Text,
	TouchableOpacity,
	View,
	Platform,
} from 'react-native';
import styles from './styles';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3333' : 'http://localhost:3333';

export default function Usuarios({ route }) {
	const auth = route?.params?.auth;
	const token = auth?.token;
	const usuarioLogado = auth?.usuario;

	const [usuarios, setUsuarios] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [erro, setErro] = useState('');
	const [modalAberto, setModalAberto] = useState(false);
	const [modoFormulario, setModoFormulario] = useState('editar');
	const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
	const [salvando, setSalvando] = useState(false);
	const [form, setForm] = useState({
		user_nome: '',
		user_senha: '',
		confirmarSenha: '',
		user_nivel_acesso: 'user',
		user_ativo: '1',
	});

	const isAdmin = usuarioLogado?.user_nivel_acesso === 'admin';
	const meuId = usuarioLogado?.user_id;

	const resetarFormulario = useCallback(() => {
		setForm({
			user_nome: '',
			user_senha: '',
			confirmarSenha: '',
			user_nivel_acesso: 'Usuário',
			user_ativo: '1',
		});
	}, []);

	const fecharModal = useCallback(() => {
		setModalAberto(false);
		setUsuarioSelecionado(null);
		resetarFormulario();
	}, [resetarFormulario]);

	const atualizarCampo = (campo, valor) => {
		setForm((prev) => ({ ...prev, [campo]: valor }));
	};

	const carregarUsuarios = useCallback(async () => {
		if (!token || !usuarioLogado?.user_id) {
			setErro('Sessão inválida. Faça login novamente.');
			setUsuarios([]);
			setLoading(false);
			setRefreshing(false);
			return;
		}

		try {
			setErro('');

			const endpoint = isAdmin
				? `${API_URL}/usuarios`
				: `${API_URL}/usuarios/${usuarioLogado.user_id}`;

			const response = await fetch(endpoint, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();

			if (!response.ok) {
				setErro(data?.erro || 'Não foi possível buscar usuários.');
				setUsuarios([]);
				return;
			}

			if (isAdmin) {
				setUsuarios(Array.isArray(data?.usuarios) ? data.usuarios : []);
			} else {
				setUsuarios(data ? [data] : []);
			}
		} catch (error) {
			setErro('Erro de conexão com a API.');
			setUsuarios([]);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, [isAdmin, token, usuarioLogado]);

	const abrirCriacao = () => {
		setModoFormulario('criar');
		setUsuarioSelecionado(null);
		resetarFormulario();
		setModalAberto(true);
	};

	const abrirEdicao = (usuario) => {
		setModoFormulario('editar');
		setUsuarioSelecionado(usuario);
		setForm({
			user_nome: usuario?.user_nome || '',
			user_senha: '',
			confirmarSenha: '',
			user_nivel_acesso: usuario?.user_nivel_acesso || 'user',
			user_ativo: String(usuario?.user_ativo ?? 1),
		});
		setModalAberto(true);
	};

	const salvarUsuario = async () => {
		const nome = form.user_nome.trim();
		const senha = form.user_senha.trim();
		const confirmarSenha = form.confirmarSenha.trim();

		if (!nome) {
			Alert.alert('Campo obrigatório', 'Informe o nome do usuário.');
			return;
		}

		if (modoFormulario === 'criar') {
			if (!senha) {
				Alert.alert('Campo obrigatório', 'Informe a senha do novo usuário.');
				return;
			}

			if (senha !== confirmarSenha) {
				Alert.alert('Erro', 'As senhas não coincidem.');
				return;
			}
		}

		if (modoFormulario === 'editar' && senha && senha !== confirmarSenha) {
			Alert.alert('Erro', 'As senhas não coincidem.');
			return;
		}

		if (!token || !usuarioLogado?.user_id) {
			Alert.alert('Sessão inválida', 'Faça login novamente.');
			return;
		}

		try {
			setSalvando(true);

			if (modoFormulario === 'criar') {
				const response = await fetch(`${API_URL}/usuarios`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						user_nome: nome,
						user_senha: senha,
						user_nivel_acesso: form.user_nivel_acesso,
					}),
				});

				const data = await response.json();

				if (!response.ok) {
					Alert.alert('Erro', data?.erro || 'Não foi possível criar o usuário.');
					return;
				}

				Alert.alert('Sucesso', 'Usuário criado com sucesso.');
				fecharModal();
				carregarUsuarios();
				return;
			}

			if (!usuarioSelecionado?.user_id) {
				Alert.alert('Erro', 'Usuário selecionado inválido.');
				return;
			}

			const payload = {
				user_nome: nome,
				user_nivel_acesso: isAdmin ? form.user_nivel_acesso : usuarioSelecionado.user_nivel_acesso,
				user_ativo: isAdmin ? Number(form.user_ativo) : Number(usuarioSelecionado.user_ativo),
			};

			if (senha) {
				payload.user_senha = senha;
			}

			const response = await fetch(`${API_URL}/usuarios/${usuarioSelecionado.user_id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (!response.ok) {
				Alert.alert('Erro', data?.erro || 'Não foi possível atualizar o usuário.');
				return;
			}

			Alert.alert('Sucesso', 'Usuário atualizado com sucesso.');
			fecharModal();
			carregarUsuarios();
		} catch (error) {
			Alert.alert('Erro de conexão', 'Não foi possível conectar com a API.');
		} finally {
			setSalvando(false);
		}
	};

	const desativarUsuario = (usuario) => {
		Alert.alert(
			'Desativar usuário',
			`Deseja desativar ${usuario.user_nome}?`,
			[
				{ text: 'Cancelar', style: 'cancel' },
				{
					text: 'Desativar',
					style: 'destructive',
					onPress: async () => {
						try {
							const response = await fetch(`${API_URL}/usuarios/${usuario.user_id}`, {
								method: 'DELETE',
								headers: {
									'Content-Type': 'application/json',
									Authorization: `Bearer ${token}`,
								},
							});

							const data = await response.json();

							if (!response.ok) {
								Alert.alert('Erro', data?.erro || 'Não foi possível desativar o usuário.');
								return;
							}

							Alert.alert('Sucesso', 'Usuário desativado com sucesso.');
							carregarUsuarios();
						} catch (error) {
							Alert.alert('Erro de conexão', 'Não foi possível conectar com a API.');
						}
					},
				},
			],
		);
	};

	const podeEditarUsuario = (usuario) => isAdmin || usuario?.user_id === meuId;
	const podeDesativarUsuario = (usuario) => isAdmin && usuario?.user_id !== meuId;

	useEffect(() => {
		carregarUsuarios();
	}, [carregarUsuarios]);

	function onRefresh() {
		setRefreshing(true);
		carregarUsuarios();
	}

	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>Usuários</Text>
			{/* <Text style={styles.subtitulo}>
				{isAdmin
					? 'Perfil admin: visualização de todos os usuários.'
					: 'Perfil usuário: visualização apenas do próprio perfil.'}
			</Text> */}

			{isAdmin && (
				<TouchableOpacity style={styles.novoButton} onPress={abrirCriacao}>
					<Text style={styles.novoButtonText}>Adicionar usuário</Text>
				</TouchableOpacity>
			)}

			{loading ? (
				<View style={styles.centerBox}>
					<ActivityIndicator size="large" color="#2563EB" />
					<Text style={styles.infoText}>Carregando dados...</Text>
				</View>
			) : erro ? (
				<View style={styles.centerBox}>
					<Text style={styles.erroText}>{erro}</Text>
					<TouchableOpacity style={styles.retryButton} onPress={carregarUsuarios}>
						<Text style={styles.retryButtonText}>Tentar novamente</Text>
					</TouchableOpacity>
				</View>
			) : (
				<ScrollView
					contentContainerStyle={styles.lista}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				>
					{usuarios.map((usuario) => (
						<View key={String(usuario.user_id)} style={styles.card}>
							<Text style={styles.nome}>{usuario.user_nome}</Text>
							<Text style={styles.linha}>Status: {Number(usuario.user_ativo) === 1 ? 'Ativo' : 'Inativo'}</Text>

							{isAdmin && (
								<>
									<Text style={styles.linha}>ID: {usuario.user_id}</Text>
									<Text style={styles.linha}>
										Nível de acesso: {usuario.user_nivel_acesso === 'admin' ? 'Administrador' : 'Usuário'}
									</Text>
								</>
							)}

							{podeEditarUsuario(usuario) && (
								<TouchableOpacity
									style={[styles.actionButton, styles.editButton]}
									onPress={() => abrirEdicao(usuario)}
								>
									<Text style={styles.actionButtonText}>
										{isAdmin ? 'Editar usuário' : 'Alterar usuário'}
									</Text>
								</TouchableOpacity>
							)}

							{podeDesativarUsuario(usuario) && (
								<TouchableOpacity
									style={[styles.actionButton, styles.deleteButton]}
									onPress={() => desativarUsuario(usuario)}
								>
									<Text style={styles.actionButtonText}>Desativar</Text>
								</TouchableOpacity>
							)}
						</View>
					))}

					{usuarios.length === 0 && (
						<View style={styles.centerBox}>
							<Text style={styles.infoText}>Nenhum usuário encontrado.</Text>
						</View>
					)}
				</ScrollView>
			)}

			<Modal visible={modalAberto} transparent animationType="slide" onRequestClose={fecharModal}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalCard}>
						<Text style={styles.modalTitulo}>
							{modoFormulario === 'criar' ? 'Adicionar usuário' : 'Editar usuário'}
						</Text>

						<ScrollView>
							<Text style={styles.labelFormulario}>Nome</Text>
							<TextInput
								style={styles.inputFormulario}
								placeholder="Nome do usuário"
								placeholderTextColor="#94A3B8"
								value={form.user_nome}
								onChangeText={(valor) => atualizarCampo('user_nome', valor)}
							/>

							{isAdmin && (
								<>
									<Text style={styles.labelFormulario}>Nível de acesso</Text>
									<TextInput
										style={styles.inputFormulario}
										placeholder="admin ou usuário"
										placeholderTextColor="#94A3B8"
										value={form.user_nivel_acesso}
										onChangeText={(valor) => atualizarCampo('user_nivel_acesso', valor)}
									/>
									{modoFormulario === 'editar' && (
										<>
											<Text style={styles.labelFormulario}>Status</Text>
											<TextInput
												style={styles.inputFormulario}
												placeholder="1 para ativo, 0 para inativo"
												placeholderTextColor="#94A3B8"
												value={form.user_ativo}
												onChangeText={(valor) => atualizarCampo('user_ativo', valor)}
											/>
										</>
									)}
								</>
							)}

							<Text style={styles.labelFormulario}>
								{modoFormulario === 'criar' ? 'Senha' : 'Nova senha (opcional)'}
							</Text>
							<TextInput
								style={styles.inputFormulario}
								placeholder={modoFormulario === 'criar' ? 'Senha' : 'Nova senha'}
								placeholderTextColor="#94A3B8"
								secureTextEntry
								value={form.user_senha}
								onChangeText={(valor) => atualizarCampo('user_senha', valor)}
							/>

							<Text style={styles.labelFormulario}>Confirmar senha</Text>
							<TextInput
								style={styles.inputFormulario}
								placeholder="Confirmar senha"
								placeholderTextColor="#94A3B8"
								secureTextEntry
								value={form.confirmarSenha}
								onChangeText={(valor) => atualizarCampo('confirmarSenha', valor)}
							/>

							<View style={styles.modalAcoes}>
								<TouchableOpacity style={styles.botaoSecundario} onPress={fecharModal}>
									<Text style={styles.botaoSecundarioTexto}>Cancelar</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={[styles.botaoPrimario, salvando && styles.botaoDesabilitado]}
									onPress={salvarUsuario}
									disabled={salvando}
								>
									<Text style={styles.botaoPrimarioTexto}>
										{salvando ? 'Salvando...' : 'Salvar'}
									</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
					</View>
				</View>
			</Modal>
		</View>
	);
}
