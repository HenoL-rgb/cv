import {
  TextInput,
  IconButton,
  Button,
  Snackbar,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthForm } from "../../interfaces";
import { useLazyQuery } from "@apollo/client";
import { USER_LOGIN } from "../../apollo/auth/auth";

function LoginPage() {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [login, { loading, error }] = useLazyQuery(USER_LOGIN);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>();

  const submitLoginForm = async (values: AuthForm) => {
    try {
      const { data } = await login({ variables: values });
      console.log(data);
    } catch(e) {
      console.log(e)
    }
  };

  return (
    <View style={styles.auth}>
      <Text style={{ fontSize: 20, textAlign: "center" }}>Login</Text>
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Required field!",
          pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        }}
        render={({ field: { value, onBlur, onChange } }) => (
          <TextInput
            label="Email"
            variant="standard"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            leading={(props) => <Icon name="account" {...props} />}
          />
        )}
      />

      {errors?.email ? (
        <Text style={styles.incorrectField}>
          {errors?.email.message || "Incorrect email"}
        </Text>
      ) : null}

      <Controller
        name="password"
        control={control}
        rules={{
          required: "Required field!",
        }}
        render={({ field: { value, onBlur, onChange } }) => (
          <TextInput
            variant="standard"
            secureTextEntry={hiddenPassword}
            onBlur={onBlur}
            label="Password"
            onChangeText={onChange}
            value={value}
            leading={(props) => (
              <IconButton
                onPress={() => setHiddenPassword(!hiddenPassword)}
                icon={(props) => <Icon name="eye" {...props} />}
                {...props}
              />
            )}
          />
        )}
      />

      {errors?.password ? (
        <Text style={styles.incorrectField}>
          {errors?.password.message || "Something went wrong"}
        </Text>
      ) : null}

      <Button
        title="Submit"
        onPress={handleSubmit(submitLoginForm)}
        loading={loading}
        loadingIndicatorPosition="overlay"
      />
      <Button variant="outlined" title="Reset Password" />
      {error ? (
        <Snackbar message={error.message} style={styles.snackBar} />
      ) : null}
    </View>
  );
}
export default LoginPage;

const styles = StyleSheet.create({
  auth: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    gap: 10,
  },
  incorrectField: {
    color: "red",
  },
  snackBar: {
    position: "absolute",
    start: 16,
    end: 16,
    bottom: 16,
  },
});
