import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { USERS } from "../apollo/users/users";
import Loader from "../components/Loader";

export default function Employees() {
  const { loading, error, data } = useQuery(USERS);

  return loading ? (
    <Loader />
  ) : (
    <View>
      {data ? (
        <FlatList
          data={data.users}
          renderItem={({ item }) => <Text>{item.email}</Text>}
        ></FlatList>
      ) : (
        ""
      )}
    </View>
  );
}
