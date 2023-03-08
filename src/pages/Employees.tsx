import { useQuery } from "@apollo/client";
import { IconButton, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  RefreshControl,
  StyleSheet,
  TextInputChangeEventData,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { USERS } from "../apollo/users/users";
import Employee from "../components/Employee";
import Loader from "../components/Loader";

export default function Employees() {
  const { loading, error, data } = useQuery(USERS);
  const [query, setQuery] = useState<string>("");

  const filtered = data ? data.users.filter((user: any) => {
        if (user.profile.first_name && user.profile.last_name) {
          return (
            user.profile.first_name.includes(query) ||
            user.profile.last_name.includes(query)
          );
        }

        if (!query) {
          return user;
        }
      })
    : [];

  function handleQuery(text: string) {
    setQuery(text);
  }

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <View>
        <TextInput
          variant="outlined"
          placeholder="Search"
          style={{ margin: 16 }}
          inputStyle={{ fontSize: 16, paddingStart: 16, paddingEnd: 12 }}
          color="rgba(0,0,0, 0.5)"
          trailing={(props) => (
            <IconButton
              icon={(props) => <Icon name="search-outline" {...props} />}
              {...props}
            />
          )}
          value={query}
          onChangeText={handleQuery}
        />

      </View>

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={filtered}
          refreshControl={<RefreshControl refreshing={loading} />}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Employee
                firstName={item.profile.first_name}
                lastName={item.profile.last_name}
                department={item.department || { name: "" }}
                avatar={item.profile.avatar}
                position={item.position || { name: "" }}
              />
            </TouchableOpacity>
          )}
        ></FlatList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
