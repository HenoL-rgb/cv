import { useQuery } from "@apollo/client";
import { IconButton, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { FlatList, View, RefreshControl, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { USERS } from "../apollo/users/users";
import Employee from "../components/Employee";
import Loader from "../components/Loader";
import { user } from "../interfaces/user";
import { users } from "../interfaces/users";

export default function Employees() {
  const { loading, error, data } = useQuery(USERS);
  
  const [query, setQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortUp, setSortUp] = useState<boolean | null>(null);

  const filtered = filterEmployees(data, query);
  const filteredAndSorted = sortEmployees(filtered, sortBy);

  function handleSortMenu(sortBy: string) {
    console.log(sortBy);
    setSortBy(sortBy);
  }

  function handleQuery(text: string) {
    setQuery(text);
  }

  function handleChangeSort() {
    setSortUp(sortUp ? !sortUp : true);
  }

  function filterEmployees(employees: users, query: string): user[] {
    return employees
      ? employees.users.filter((user: user) => {
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
  }

  function sortEmployees(employees: user[], sortBy: string | null): user[] {
    return employees;
  }

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <View style={styles.searchAndSort}>
        <TextInput
          variant="outlined"
          placeholder="Search"
          style={{ margin: 16, flex: 2 }}
          inputStyle={{ fontSize: 16, paddingStart: 16, paddingEnd: 12 }}
          color="rgba(0,0,0, 0.5)"
          trailing={() => (
            <IconButton
              icon={(props) => <Icon name="search-outline" {...props} />}
             
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
  searchAndSort: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 5,
  },
});
