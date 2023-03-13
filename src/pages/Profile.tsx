import React from "react";
import { Text } from "@react-native-material/core";
import { View } from "react-native";
import { useQuery } from "@apollo/client";
import { USER_INFO } from "../apollo/profile/profile";
import Loader from "../components/Loader";
import { Divider } from "@react-native-material/core";
import UserPicture from "../components/UserPicture";
import { SKILLS } from "../apollo/profile/skills";
import ProfileInfoForm from "../components/ProfileInfoForm";

const Profile = () => {
  const id = "1408"
  const { loading, error, data, refetch } = useQuery(USER_INFO, {
    variables: {
      id: id,
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Someting went wrong...</Text>;
  }

  return (
    <View style={{ padding: 9, flex: 1, backgroundColor: "white" }}>
      <UserPicture
        url={data.user.profile.avatar}
        id={data.user.profile.id}
        refetch={() => refetch()}
      />

      <View style={{alignItems: "center"}}>
        <Text>{data?.user.email}</Text>
        <Text>
          A member since {new Date(+data.user.profile.created_at).toDateString()}
        </Text>
      </View>

      <Divider style={{ marginVertical: 10 }} leadingInset={16} />

     <ProfileInfoForm id={id} data={data} refetch={()=> refetch()}/>
    </View>
  );
};

export default Profile;
