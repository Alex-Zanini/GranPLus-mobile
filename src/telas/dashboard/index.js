import { View, Text } from "react-native";
import styles from "./styles";

export default function Dashboard() {
  const dados = [
    { id: 1, nome: "Teclado gamer", preco: 50, quantidade: 10 },
    { id: 2, nome: "Mouse", preco: 20, quantidade: 25 },
    { id: 3, nome: "Notebook Lenovo", preco: 2500, quantidade: 4 },
  ];

  const entradasHoje = 15;
  const saidasHoje = 10;

  const saldoHoje = entradasHoje - saidasHoje;

  const estoqueMinimo = 5; // Definindo o estoque mínimo
  const produtosCriticos = dados.filter((item) => item.quantidade < estoqueMinimo);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem vindo ao sistema Granplus, *nome do usuário*</Text>
      <Text style={styles.subHeader}>Resumo Diário:</Text>
      <View style={styles.dailySummaryContainer}>
        <Text style={styles.dailySummaryText}>Entradas Hoje: {entradasHoje}</Text>
        <Text style={styles.dailySummaryText}>Saídas Hoje: {saidasHoje}</Text>
        <Text style={styles.dailySummaryText}>Saldo do Dia: {saldoHoje}</Text>
      </View>
      <Text style={styles.subHeader}>Produtos com Estoque Crítico:</Text>
      {produtosCriticos.length > 0 ? (
        produtosCriticos.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.nome} - Quantidade: {item.quantidade}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.itemText}>Nenhum produto com estoque crítico.</Text>
      )}
      <Text style={styles.subHeader}>Resumo do Estoque:</Text>
      {dados.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.itemText}>
            {item.nome} - Preço: R${item.preco},00 - Quantidade: {item.quantidade}
          </Text>
        </View>
      ))}
    </View>
  );
}