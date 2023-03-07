import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./src/pages/loginPage/LoginPage";
import RegisterPage from "./src/pages/registerPage/RegisterPage";
import { ApolloProvider } from "@apollo/client";
import client from "./src/apollo/client";
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
    <>
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <StatusBar style="auto" />
        {/* <LoginPage /> */}
        <RegisterPage />
      </ApolloProvider>
    </View>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
