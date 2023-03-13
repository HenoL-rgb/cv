import { ApolloProvider } from "@apollo/client";
import client from "./src/apollo/client";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Employees from "./src/pages/Employees";
import { Foundation } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./src/pages/SignUp";
import Login from "./src/pages/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Account from "./src/pages/Account";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const _retrieveToken = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          // We have data!!
          setAuth(true);
          return value;
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
      return "";
    };

    _retrieveToken();
  }, []);

  return (
    <>
    <ApolloProvider client={client}>
      {auth ? (
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
            <Drawer.Screen
              name="Account"
              component={Account}
              options={{
                drawerIcon: ({ focused, size, color }) => (
                  <Foundation name="torsos" size={size} color={color} />
                ),
                unmountOnBlur: true
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
