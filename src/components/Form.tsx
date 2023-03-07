import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";
import { Button, TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { authForm } from "../interfaces/authForm";
import { formProps } from "../interfaces/formProps";

export default function Form({ handleClick, loading }: formProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: authForm) => {
    handleClick(data);
  };

  const [securedPass, setSecuredPass] = useState(true);

  function handleSecured() {
    setSecuredPass(!securedPass);
  }

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        rules={{
          required: "Invalid email",
          pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            color="#C63031"
            label="Email"
            variant="outlined"
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email.message || "Incorrect email"}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: "Invalid password",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            color="#C63031"
            value={value}
            label="Password"
            variant="outlined"
            secureTextEntry={securedPass}
            trailing={(props) => (
              <IconButton
                onPress={handleSecured}
                icon={(props) => (
                  <Icon name={securedPass ? "eye" : "eye-off"} {...props} />
                )}
                {...props}
              />
            )}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Button
        style={styles.button}
        color="#C63031"
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        loadingIndicatorPosition="overlay"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
    width: "100%",
  },
  input: {
    minWidth: 270,
    maxWidth: 420,
  },
  button: {
    minWidth: 100,
  },
  error: {
    color: "rgba(255, 0, 0, 0.877)",
  },
});

// display: flex;
//   flex-direction: column;
//   align-items: center;
//   row-gap: 10px;
//   width: 100%;
//   & input {
//     width: 100%;
//     max-width: 420px;
//     min-width: 250px;
//     padding: 10px 12px;
//     outline: none;
//     border-radius: 5px;
//     border: 1px solid rgba(0, 0, 0, 0.1);
//     font-size: 16px;
//   }
//   & input[type="submit"] {
//     margin-top: 15px;
//     background-color: #3f5dab;
//     font-size: 18px;
//     width: 30%;
//     min-width: min-content;
//     color: white;
//     border: 0;
//     cursor: pointer;
//     &:active {
//       background-color: #4064c0;
//     }
//   }
