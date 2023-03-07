import { ApolloProvider } from "@apollo/client";
import client from "./src/apollo/client";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Employees from "./src/pages/Employees";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Foundation } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from "./src/pages/SignUp";
import Login from "./src/pages/Login";

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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
