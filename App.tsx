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

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const isAuth = true;
  return (
    <>
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
              component={LoginPage}
              options={{ title: "Login" }}
            />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
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
