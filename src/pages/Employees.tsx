import { useQuery } from "@apollo/client";
import { IconButton, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { FlatList, View, RefreshControl, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { USERS } from "../apollo/users/users";
import Employee from "../components/Employee";
import Loader from "../components/Loader";
import { user } from "../interfaces/user";
import { users } from "../interfaces/users";
import EmployeeSortMenu from "../components/EmployeeSortMenu";
import ApplySwipeable from "../components/ApplySwipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Employees() {
  const { loading, error, data } = useQuery(USERS);
  const [query, setQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortUp, setSortUp] = useState<boolean | null>(null);
  const filtered = filterEmployees(data, query);
  const filteredAndSorted = sortEmployees(filtered, sortBy);

  function handleSortMenu(sortBy: string) {
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
          if (
            (user.profile.first_name &&
              user.profile.first_name.includes(query)) ||
            (user.profile.last_name && user.profile.last_name.includes(query))
          ) {
            return true;
          }

          if (!query) {
            return user;
          }
        })
      : [];
  }

  function sortEmployees(employees: user[], sortBy: string | null): user[] {
    if (!sortBy) return employees;

    return [...employees.sort(sortUp ? compareAsc : compareDesc)];
  }

  return (
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
        <EmployeeSortMenu
          sortBy={sortBy}
          sortUp={sortUp}
          handleChangeSort={handleChangeSort}
          handleSortMenu={handleSortMenu}
        />
      </View>

      {error ? <Text>Error while loading employees</Text> : ""}

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredAndSorted}
          refreshControl={<RefreshControl refreshing={loading} />}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          renderItem={({ item }) => (
            <ApplySwipeable
              rightActionColor="red"
              leftActionColor="#45ee9f"
              RightActionIcon={
                <IconButton
                  icon={() => (
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={24}
                      color="white"
                    />
                  )}
                  onPress={() => alert('e')}
                />
              }
              LeftActionIcon={
                <IconButton
                  icon={() => (
                    <MaterialCommunityIcons
                      name="account-edit"
                      size={24}
                      color="white"
                    />
                  )}
                />
              }
            >
              <Employee
                firstName={item.profile.first_name}
                lastName={item.profile.last_name}
                department={item.department || { name: "" }}
                avatar={item.profile.avatar}
                position={item.position || { name: "" }}
              />
            </ApplySwipeable>
          )}
        ></FlatList>
      )}
    </View>
  );

  function compareAsc(user1: user, user2: user) {
    if (!sortBy) return 0;
    switch (sortBy) {
      case "first_name": {
        if (!user1.profile.first_name) return -1;
        if (!user2.profile.first_name) return 1;
        return user1.profile.first_name.localeCompare(user2.profile.first_name);
      }
      case "last_name": {
        if (!user1.profile.last_name) return -1;
        if (!user2.profile.last_name) return 1;
        return user1.profile.last_name.localeCompare(user2.profile.last_name);
      }
      case "email": {
        if (!user1.email) return -1;
        if (!user2.email) return 1;
        return user1.email.localeCompare(user2.email);
      }
      case "department": {
        if (!user1.department) return -1;
        if (!user2.department) return 1;
        return user1.department.name.localeCompare(user2.department.name);
      }
      case "position": {
        if (!user1.position) return -1;
        if (!user2.position) return 1;
        return user1.position.name.localeCompare(user2.position.name);
      }
    }

    return -1;
  }

  function compareDesc(user1: user, user2: user) {
    if (!sortBy) return 0;
    switch (sortBy) {
      case "first_name": {
        if (!user1.profile.first_name) return 1;
        if (!user2.profile.first_name) return -1;
        return user2.profile.first_name.localeCompare(user1.profile.first_name);
      }
      case "last_name": {
        if (!user1.profile.last_name) return 1;
        if (!user2.profile.last_name) return -1;
        return user2.profile.last_name.localeCompare(user1.profile.last_name);
      }
      case "email": {
        if (!user1.email) return 1;
        if (!user2.email) return -1;
        return user2.email.localeCompare(user1.email);
      }
      case "department": {
        if (!user1.department) return 1;
        if (!user2.department) return -1;
        return user2.department.name.localeCompare(user1.department.name);
      }
      case "position": {
        if (!user1.position) return 1;
        if (!user2.position) return -1;
        return user2.position.name.localeCompare(user1.position.name);
      }
    }

    return -1;
  }
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
