import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Form from "../components/Form";
import {
  Stack,
  Button,
  TextInput,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;


export default function Login({ navigation }: Props) {
  function handleLogin() {
    alert("submit");
  }

  function handleNavigate() {
    navigation.navigate('SignUp')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subTitle}>Hello again! Sign in to continue.</Text>
      <Form handleClick={handleLogin} />
      <Button color="#C63031" variant="text" title="I DONT HAVE AN ACCOUNT" onPress={handleNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
  },
  subTitle: {
    fontSize: 12,
  },
});
