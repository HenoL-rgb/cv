import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./src/pages/loginPage/LoginPage";
import RegisterPage from "./src/pages/registerPage/RegisterPage";
import { ApolloProvider } from "@apollo/client";
import client from "./src/apollo/client";
export default function App() {
  return (
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <StatusBar style="auto" />
        {/* <LoginPage /> */}
        <RegisterPage />
      </ApolloProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
