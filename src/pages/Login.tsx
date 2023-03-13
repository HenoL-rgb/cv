import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Form from "../components/Form";
import { Button } from "@react-native-material/core";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { authForm } from "../interfaces/authForm";
import { useLazyQuery } from "@apollo/client";
import { USER_LOGIN } from "../apollo/auth/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";


type Props = NativeStackScreenProps<RootStackParamList, "Login">;
//type asd = NativeStackNavigationProp<RootStackParamList, "Login">

export default function Login({ navigation }: Props) {
  const [login, { loading, error }] = useLazyQuery(USER_LOGIN);

  function handleLogin(data: authForm) {
    submitLoginForm(data);
  }

  function handleNavigate() {
    navigation.navigate("SignUp");
  }

  const _storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem(
        'token',
        token,
      );
      
    } catch (error) {
      // Error saving data
      alert(error)
    }
  };
  
  async function submitLoginForm(values: authForm) {
    try {
      const { data } = await login({ variables: values });
      _storeToken(data.login.access_token)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subTitle}>Hello again! Sign in to continue.</Text>
      <Form handleClick={handleLogin} loading={loading} />
      <Button
        color="#C63031"
        variant="text"
        title="I DONT HAVE AN ACCOUNT"
        onPress={handleNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
  },
  subTitle: {
    fontSize: 12,
  },
});
