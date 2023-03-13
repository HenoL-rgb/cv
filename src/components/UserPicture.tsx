import React from "react";
import { View, Button, Image, TouchableOpacity } from "react-native";
import { Avatar } from "@react-native-material/core";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { UPLOAD_AVATAR } from "../apollo/profile/uploadAvatar";
import { ActivityIndicator } from "@react-native-material/core";

interface UserPicture {
  url: string;
  id: string;
  refetch: () => void;
}

export default function UserPicture({ url, id, refetch }: UserPicture) {
  const [uploadPicture, { loading }] = useMutation(UPLOAD_AVATAR);

  const getFileInfo = async (fileURI: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    if (!fileInfo.exists) {
      throw new Error("FileSystem.getInfoAsync error")
    }
    return fileInfo;
  };

  const checkSize = (fileSize: number, smallerThanSizeMB: number) => {
    return fileSize / 1024 / 1024 < smallerThanSizeMB;
  };

  const uploadAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        base64: true,
      });

      if (result.canceled) return;

      const fileInfo = await getFileInfo(result.assets[0].uri);
      
      const sizeCorrespondence = checkSize(fileInfo.size, 0.5);

      if (!sizeCorrespondence) {
        Alert.alert(`Image size should be smaller than 0.5 Mb!`);
        return;
      }

      uploadPicture({
        variables: {
          id: id,
          avatar: {
            base64: "data:image/jpeg;base64," + result.assets[0].base64,
            size: 100,
            type: "image/jpeg",
          },
        },
      }).then(() => refetch());
    } catch (error) {
      return;
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity onPress={uploadAvatar}>
        <Avatar image={{ uri: url }} size={102} />
      </TouchableOpacity>
    </View>
  );
}
