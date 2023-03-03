import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Employees from "./src/pages/Employees";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './src/pages/Login';
import SignUp from "./src/pages/SignUp";


const client = new ApolloClient({
  uri: "https://cv-project-js.inno.ws/api/graphql",
  cache: new InMemoryCache(),
});

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const isAuth = true;
  return (
    <ApolloProvider client={client}>
      {isAuth ? (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Employees">
            <Drawer.Screen name="Employees" component={Employees} />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
