import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1e3a5f", // Azul escuro
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff", // Branco
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
    color: "#ffffff", // Branco
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ffffff", // Branco
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemText: {
    fontSize: 14,
    color: "#1e3a5f", // Azul escuro
  },
  dailySummaryContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#ffffff", // Branco
    borderRadius: 5,
  },
  dailySummaryText: {
    fontSize: 16,
    color: "#1e3a5f", // Azul escuro
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#ffffff",
    backgroundColor: "#1e3a5f",
  },
});

export default styles;