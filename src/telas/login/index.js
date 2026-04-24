import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const API_URL = Platform.OS === "android" ? "http://10.0.2.2:3333" : "http://localhost:3333";

export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isResetMode, setIsResetMode] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
        if (!username.trim() || !password.trim()) {
            Alert.alert("Campos obrigatórios", "Informe usuário e senha.");
            return;
        }

        try {
            setIsLoading(true);

            const response = await fetch(`${API_URL}/usuarios/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_nome: username.trim(),
                    user_senha: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert("Login inválido", data?.erro || "Usuário ou senha incorretos.");
                return;
            }

            navigation.navigate("MainTabs", {
                auth: {
                    token: data.token,
                    usuario: data.usuario,
                },
            });
        } catch (error) {
            Alert.alert("Erro de conexão", "Não foi possível conectar com a API.");
        } finally {
            setIsLoading(false);
        }
    }

    function handleStartReset() {
        if (isResetMode) {
            setIsResetMode(false);
        } else {
            setIsResetMode(true);
            setNewPassword("");
            setConfirmPassword("");
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
    }

    function handleConfirmReset() {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Erro", "Preencha os dois campos de senha.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        setPassword(newPassword);
        setIsResetMode(false);
        Alert.alert("Atenção", "A redefinição local não altera a senha no servidor.");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    placeholderTextColor="#888"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Senha"
                        placeholderTextColor="#888"
                        secureTextEntry={!showLoginPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => setShowLoginPassword((prev) => !prev)}
                    >
                        <Text style={styles.toggleText}>
                            {showLoginPassword ? "Ocultar" : "Mostrar"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={handleStartReset}>
                <Text style={styles.forgotText}>Redefinir senha</Text>
            </TouchableOpacity>

            {isResetMode && (
                <>
                    <View style={styles.inputContainer}>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Nova senha"
                                placeholderTextColor="#888"
                                secureTextEntry={!showNewPassword}
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <TouchableOpacity
                                style={styles.toggleButton}
                                onPress={() => setShowNewPassword((prev) => !prev)}
                            >
                                <Text style={styles.toggleText}>
                                    {showNewPassword ? "Ocultar" : "Mostrar"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Confirmar nova senha"
                                placeholderTextColor="#888"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity
                                style={styles.toggleButton}
                                onPress={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                <Text style={styles.toggleText}>
                                    {showConfirmPassword ? "Ocultar" : "Mostrar"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { marginBottom: 16 }]}
                        onPress={handleConfirmReset}
                    >
                        <Text style={styles.buttonText}>Salvar nova senha</Text>
                    </TouchableOpacity>
                </>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>{isLoading ? "Entrando..." : "Entrar"}</Text>
            </TouchableOpacity>
        </View>
    );
}