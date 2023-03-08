import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "@react-native-material/core";

export interface Employee {
  firstName: string;
  lastName: string;
  position: {
    name: string;
  };
  department: {
    name: string;
  };
  avatar: string;
}
export default function Employee(props: Employee) {

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {props.avatar ? (
          <Avatar image={{ uri: props.avatar }} />
        ) : (
          <Avatar label={`${props.firstName}`} color='rgba(0, 0, 0, 0.137)' />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {props.firstName ? props.firstName : 'Unknown'} {props.lastName}
        </Text>
        <Text style={styles.text}>{props.position.name}</Text>
        <Text style={styles.text}>{props.department.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 10,
    padding: 8,
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: 'rgba(0,0,0,0.4)'
  }
});
