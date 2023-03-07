import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Form from "../components/Form";
import { Button } from "@react-native-material/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "../apollo/auth/auth";
import { authForm } from "../interfaces/authForm";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUp({ navigation }: Props) {
  const [register, { loading, error }] = useMutation(USER_REGISTER);

  function handleRegister(data: authForm) {
    submitRegisterForm(data)
  }

  function handleNavigate() {
    navigation.navigate("Login");
  }

  async function submitRegisterForm(values: authForm) {
    const { email, password } = values;
    try {
      const { data } = await register({ variables: { email, password } });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Now</Text>
      <Text style={styles.subTitle}>Welcome! Sign up to continue.</Text>
      <Form handleClick={handleRegister} loading={loading}/>
      <Button
        color="#C63031"
        variant="text"
        title="ALREADY HAVE AN ACCOUNT?"
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
