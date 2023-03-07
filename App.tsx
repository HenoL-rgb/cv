import LoginPage from "./src/pages/loginPage/LoginPage";
import RegisterPage from "./src/pages/registerPage/RegisterPage";
import { ApolloProvider } from "@apollo/client";
import client from "./src/apollo/client";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Employees from "./src/pages/Employees";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import { Foundation } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';

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
    <>
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
              component={LoginPage}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
