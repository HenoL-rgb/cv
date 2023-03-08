import React from "react";
import { Text } from "@react-native-material/core";
import { useQuery } from "@apollo/client";
import { USER_INFO } from "../apollo/profile/profile";

const Profile = () => {
    const { loading, error, data } = useQuery(USER_INFO, {
        variables: {
            id: "1408"
        }
    })
    console.log(data)
//     console.log(data)
  return <Text>Profiles</Text>;
};

export default Profile;
