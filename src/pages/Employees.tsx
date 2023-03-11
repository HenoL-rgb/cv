import { useQuery } from "@apollo/client";
import { IconButton, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { USERS } from "../apollo/users/users";
import Employee from "../components/Employee";
import Loader from "../components/Loader";
import { user } from "../interfaces/user";
import { users } from "../interfaces/users";
import EmployeeSortMenu from "../components/EmployeeSortMenu";
import ApplySwipeable from "../components/ApplySwipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Employees() {
  const { loading, error, data, refetch } = useQuery(USERS);
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

  function filterEmployees(
    employees: users | undefined,
    query: string
  ): user[] {
    return employees
      ? employees.users.filter((user: user) => {
          if (
            (user.profile.first_name &&
              user.profile.first_name
                .toLowerCase()
                .includes(query.toLowerCase())) ||
            (user.profile.last_name &&
              user.profile.last_name
                .toLowerCase()
                .includes(query.toLowerCase()))
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

    return [...employees.sort()];
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchAndSort}>
        <TextInput
          variant="outlined"
          placeholder="Search"
          style={styles.input}
          inputStyle={styles.input.inputStyle}
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
          initialNumToRender={20}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
          }
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
          style={styles.employees}
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
                  onPress={() => alert("e")}
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
              <Pressable
                onPress={() => alert("")}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                  },
                ]}
              >
                <Employee
                  firstName={item.profile.first_name}
                  lastName={item.profile.last_name}
                  department={item.department || { name: "" }}
                  avatar={item.profile.avatar}
                  position={item.position || { name: "" }}
                />
              </Pressable>
            </ApplySwipeable>
          )}
        ></FlatList>
      )}
    </View>
  );

}

function compByFirstName(user1: user, user2: user) {
  if (!user1.profile.first_name) return -1;
  if (!user2.profile.first_name) return 1;
  return user1.profile.first_name.localeCompare(user2.profile.first_name);
}

function compByLastName(user1: user, user2: user) {
  if (!user1.profile.last_name) return -1;
  if (!user2.profile.last_name) return 1;
  return user1.profile.last_name.localeCompare(user2.profile.last_name);
}

function compByEmail(user1: user, user2: user) {
  if (!user1.email) return -1;
  if (!user2.email) return 1;
  return user1.email.localeCompare(user2.email);
}

function compByDepartment(user1: user, user2: user) {
  if (!user1.department) return -1;
  if (!user2.department) return 1;
  return user1.department.name.localeCompare(user2.department.name);
}

function compByPosition(user1: user, user2: user) {
  if (!user1.position) return -1;
  if (!user2.position) return 1;
  return user1.position.name.localeCompare(user2.position.name);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  employees: {
    flex: 1,
  },
  searchAndSort: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 5,
  },
  input: {
    margin: 16,
    flex: 2,
    inputStyle: {
      fontSize: 16,
      paddingStart: 16,
      paddingEnd: 12,
    },
  },
});
