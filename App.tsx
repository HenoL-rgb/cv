import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Employees from "./src/pages/Employees";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import { Foundation } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';

const client = new ApolloClient({
  uri: "https://cv-project-js.inno.ws/api/graphql",
  cache: new InMemoryCache(),
});


export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};


const RootStack = createStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const isAuth = false;
  return (
    <ApolloProvider client={client}>
      {isAuth ? (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Employees">
            <Drawer.Screen
              name="Employees"
              component={Employees}
              options={{
                drawerIcon: ({ focused, size, color }) => (
                  <Foundation name="torsos" size={size} color={color} />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Login">
            <RootStack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            />
            <RootStack.Screen
              name="SignUp"
              component={SignUp}
              options={{ title: "Sign up" }}
            />
          </RootStack.Navigator>
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
