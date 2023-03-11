import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import React, { memo } from "react";
import { OperationVariables, ApolloQueryResult } from "@apollo/client";
import { user } from "../interfaces/user";

export interface item {
  item: user;
}

interface EmployeeListProps {
  data: user[];
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
  renderItem: ({ item }: item) => JSX.Element;
  loading: boolean;
}

const EmployeeList = memo( function EmployeeList({
  data,
  refetch,
  renderItem,
  loading,
}: EmployeeListProps) {
  return (
    <FlatList
      data={data}
      initialNumToRender={10}
      keyExtractor={(item, index) => item.id}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
      ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      style={styles.employees}
      maxToRenderPerBatch={10}
      renderItem={renderItem}
    ></FlatList>
  );
})

export default EmployeeList;

const styles = StyleSheet.create({
  employees: {
    flex: 1,
  },
});
