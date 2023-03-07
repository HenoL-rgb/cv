import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Form from "../components/Form";
import { Button } from "@react-native-material/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { authForm } from "../interfaces/authForm";
import { useLazyQuery } from "@apollo/client";
import { USER_LOGIN } from "../apollo/auth/auth";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [login, { loading, error }] = useLazyQuery(USER_LOGIN);

  function handleLogin(data: authForm) {
    submitLoginForm(data);
  }

  function handleNavigate() {
    navigation.navigate("SignUp");
  }

  async function submitLoginForm(values: authForm) {
    try {
      const { data } = await login({ variables: values });
      console.log(data);
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
