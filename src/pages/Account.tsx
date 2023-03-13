import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Employees from "./Employees";
import AccountLanguages from "./AccountLanguages";
import { View } from "react-native";
const Tab = createBottomTabNavigator();
import { Ionicons } from "@expo/vector-icons";
import Profile from "./Profile";

const Account = () => {
  return (
    <View style={{flex: 1}}>
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name="Skills"
        component={Employees}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school-outline" color={color} size={size} />
          ),
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name="Languages"
        component={AccountLanguages}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="language-outline" color={color} size={size} />
          ),
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name="CVS"
        component={Employees}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" color={color} size={size} />
          ),
          unmountOnBlur: true
        }}
      />
    </Tab.Navigator>
    </View>
  );
};

export default Account;
