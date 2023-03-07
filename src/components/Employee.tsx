import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View } from "react-native";
import { USERS } from "../apollo/users/users";
import Loader from "./Loader";

export default function Employee() {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  function handleShowInfo() {
    setShowInfo(!showInfo);
  }

  return <View>
    
  </View>;
}
