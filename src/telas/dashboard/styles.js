import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F2F5F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    color: "#1E293B",
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 8,
    color: "#64748B",
  },
  itemContainer: {
    marginBottom: 10,
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemText: {
    fontSize: 14,
    color: "#475569",
  },
  dailySummaryContainer: {
    marginBottom: 20,
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  dailySummaryText: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 5,
  },
});

export default styles;