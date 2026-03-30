import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#333",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 15,
  },

  passwordInput: {
    flex: 1,
    height: 50,
    color: "#FFF",
  },

  toggleButton: {
    padding: 5,
  },

  toggleText: {
    color: "#FF3B3B",
    fontSize: 12,
    fontWeight: "bold",
  },

  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 25,
  },

  forgotText: {
    color: "#FF3B3B",
    fontSize: 13,
  },

  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF3B3B",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});