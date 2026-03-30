import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState("Admin");
    const [password, setPassword] = useState("admin123"); // campo digitado
    const [storedPassword, setStoredPassword] = useState("admin123"); // senha válida atual
    const [isResetMode, setIsResetMode] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function handleLogin() {
        if (username === "Admin" && password === storedPassword) {
            navigation.navigate("MainTabs");
        } else {
            Alert.alert("Login inválido", "Usuário ou senha incorretos.");
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

        setStoredPassword(newPassword);
        setPassword(newPassword);
        setIsResetMode(false);
        Alert.alert("Sucesso", "Senha alterada com sucesso.");
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
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}