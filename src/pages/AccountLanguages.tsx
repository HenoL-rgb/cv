import React from "react";
import { View, Text, Button } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { USER_INFO } from "../apollo/profile/profile";
import { UPDATE_USER } from "../apollo/profile/updateUser";
import { LANGUAGES } from "../apollo/profile/languages";
import { FlatList } from "react-native-gesture-handler";
const AccountLanguages = () => {
  const id = "1408";

  const { data, loading, refetch } = useQuery(USER_INFO, {
    variables: {
      id: id,
    },
  });

  console.log(data.user.profile.languages);

  const { data: languagesList } = useQuery(LANGUAGES);
  console.log("!!!!", languagesList);

  const [updateUser, { loading: saving }] = useMutation(UPDATE_USER);

  const a = [
    {
      language_name: "Belarusian",
      proficiency: "native",
    },
    {
      language_name: "English",
      proficiency: "b1",
    },
    {
      language_name: "Awesome Lang",
      proficiency: "c2",
    },
  ];

  const b = [
    {
      skill_name: "React N",
      mastery: "proficient",
    },
    {
      skill_name: "SCSS",
      mastery: "proficient",
    },
  ];

  const test = () => {
    updateUser({
      variables: {
        id: "1408",
        user: {
          departmentId: "1",
          positionId: "1",
          profile: {
            first_name: "Hell1",
            last_name: "Innoooooo",
            skills: b,
            languages: a,
          },
        },
      },
    }).then(()=> refetch())
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>{!data.user.profile.languages ? "You haven't select any language" : null}</Text>
      {/* <Button onPress={submitLoginForm} title="update"/> */}
      <FlatList
        data={data.user.profile.languages}
        renderItem={({ item }) => (
          <Skill name={item.language_name} mastery={item.proficiency} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Button onPress={test} title="save" />
    </View>
  );
};

export default AccountLanguages;

const Skill = (props: any) => {
  return (
    <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", padding: 10}}>
      <Text>{props.name}</Text>
      <Text>{props.mastery}</Text>
    </View>
  );
};
