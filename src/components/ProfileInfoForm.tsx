import React, { useEffect } from "react";
import { View } from "react-native";
import { useDepartments } from "../hooks/departments.hook";
import { usePositions } from "../hooks/positions.hook";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../apollo/profile/updateUser";
import { ProfileForm } from "../interfaces/ProfileForm";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "@react-native-material/core";
import DropdownSelect from "./DropdownSelect";

interface ProfileInfoForm {
    id: string
    refetch: () => void
    data: any
}

export default function ProfileInfoForm({data, refetch, id}: ProfileInfoForm) {
  const [updateUser, { loading }] = useMutation(UPDATE_USER);

  const departments = useDepartments();
  const positions = usePositions();

  const defaultValues = {
    first_name: data ? data.user.profile.first_name : "",
    last_name: data ? data.user.profile.last_name : "",
    department: data ? data.user.department?.id : "",
    position: data ? data.user.position?.id : "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [data]);

  const submitLoginForm = (values: ProfileForm) => {
    console.log(values)
    try {
      updateUser({
        variables: {
          id: id,
          user: {
            profile: {
              first_name: values.first_name,
              last_name: values.last_name,
            },
            departmentId: values.department,
            positionId: values.position,
          },
        },
      }).then(() => refetch())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Controller
        name="first_name"
        control={control}
        render={({ field: { value, onBlur, onChange } }) => (
          <TextInput
            label="First Name"
            variant="standard"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        name="last_name"
        control={control}
        render={({ field: { value, onBlur, onChange } }) => (
          <TextInput
            label="Last Name"
            variant="standard"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        name="department"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DropdownSelect
            value={value}
            data={departments}
            onChange={(item: any) => onChange(item.value)}
          />
        )}
      />

      <Controller
        name="position"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DropdownSelect
            value={value}
            data={positions}
            onChange={(item: any) => onChange(item.value)}
          />
        )}
      />

      <Button
        title="SAVE"
        onPress={handleSubmit(submitLoginForm)}
        loading={loading}
        loadingIndicatorPosition="overlay"
      />
    </View>
  );
}
