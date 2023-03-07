import {
  TextInput,
  IconButton,
  Button,
  Snackbar,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthForm } from "../../interfaces";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "../../apollo/auth/auth";

function RegisterPage() {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [register, { loading, error }] = useMutation(USER_REGISTER);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>();

  const submitRegisterForm = async (values: AuthForm) => {
    const {email, password, passwordRepeat} = values;
    if (password === passwordRepeat) {
        try {
            setPasswordError(false);
            const { data } = await register({ variables: {email, password} });
        } catch(e) {
            console.log(e);
        }
    } else {
      setPasswordError(true);
    }
  };

  return (
    <View style={styles.auth}>
      <Text style={{ fontSize: 20, textAlign: "center" }}>Register</Text>
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

      <Controller
        name="passwordRepeat"
        control={control}
        rules={{
          required: "Required field!",
        }}
        render={({ field: { value, onBlur, onChange } }) => (
          <TextInput
            variant="standard"
            secureTextEntry={hiddenPassword}
            onBlur={onBlur}
            label="Confirm Password"
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

      {passwordError ? (
        <Text style={styles.incorrectField}>
          Password and confirmation password do not match.
        </Text>
      ) : null}

      <Button
        title="Register"
        onPress={handleSubmit(submitRegisterForm)}
        loading={loading}
        loadingIndicatorPosition="overlay"
      />
      {error ? (
        <Snackbar message={error.message} style={styles.snackBar} />
      ) : null}
    </View>
  );
}
export default RegisterPage;

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
