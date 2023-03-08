import { IconButton } from "@react-native-material/core";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Menu, MenuItem } from "react-native-material-menu";

export interface EmployeeSortMenuProps {
  handleChangeSort: () => void;
  handleSortMenu: (sortBy: string) => void;
  sortUp: boolean | null;
  sortBy: string | null;
}

const buttons = [
  {
    id: "first_name",
    name: "First name",
  },
  {
    id: "last_name",
    name: "Last name",
  },
  {
    id: "email",
    name: "Email",
  },
  {
    id: "department",
    name: "Department",
  },
  {
    id: "position",
    name: "Position",
  },
];

export default function EmployeeSortMenu({
  handleChangeSort,
  sortUp,
  sortBy,
  handleSortMenu,
}: EmployeeSortMenuProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  function handleSetSort(id: string) {
    handleSortMenu(id);
    hideMenu();
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Menu
        visible={visible}
        anchor={
          <IconButton
            onLongPress={showMenu}
            onPress={handleChangeSort}
            icon={(props) => (
              <MaterialIcon
                name={!sortUp ? "sort-ascending" : "sort-descending"}
                {...props}
              />
            )}
          />
        }
        onRequestClose={hideMenu}
      >
        {buttons.map((button) => (
          <MenuItem
            style={
              sortBy === button.id ? styles.activeBlock : styles.defaultBlock
            }
            onPress={() => handleSetSort(button.id)}
            key={button.id}
          >
            <Text
              style={
                sortBy === button.id ? styles.activeText : styles.defaultText
              }
            >
              {button.name}
            </Text>
          </MenuItem>
        ))}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  activeBlock: {
    backgroundColor: "#C63031",
  },
  activeText: {
    color: "#ffffff",
  },
  defaultBlock: {
    backgroundColor: "#ffffff",
  },
  defaultText: {
    color: "#000000",
  },
});
