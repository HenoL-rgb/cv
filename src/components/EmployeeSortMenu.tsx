// import { IconButton } from "@react-native-material/core";
// import React, { useMemo, useState } from "react";
// import { GestureResponderEvent, StyleSheet, View, Text } from "react-native";
// import MaterialIcon from "@expo/vector-icons/MaterialCommunityIcons";
// import { onOpen, Picker } from "react-native-actions-sheet-picker";

// export interface EmployeeSortMenuProps {
//   handleChangeSort: () => void;
//   handleSortMenu: (sortBy: string) => void;
//   sortUp: boolean | null;
//   sortBy: string | null;
// }

// const buttons = [
//   {
//     id: "first_name",
//     name: "First name",
//   },
//   {
//     id: "last_name",
//     name: "Last name",
//   },
//   {
//     id: "email",
//     name: "Email",
//   },
//   {
//     id: "department",
//     name: "Department",
//   },
//   {
//     id: "position",
//     name: 'position',
//   },
// ];

// export default function EmployeeSortMenu({
//   handleChangeSort,
//   sortUp,
//   sortBy,
//   handleSortMenu,
// }: EmployeeSortMenuProps) {
//   const [visible, setVisible] = useState<boolean>(false);
//   const [selected, setSelected] = useState(undefined);
//   const [data, setData] = useState([...buttons]);

//   useEffect(() => {
//     setData(buttons);
//   }, []);

//   /*
//    **Example filter function
//    * @param {string} filter
//    */
//   const filteredData = useMemo(() => {
//     if (data && data.length > 0) {
//       return data.filter((item) =>
//         item.name
//           .toLocaleLowerCase('en')
//           .includes(query.toLocaleLowerCase('en'))
//       );
//     }
//   }, [data, query]);

//   /*
//    **Input search
//    *@param {string} text
//    */
//   const onSearch = (text) => {
//     setQuery(text);
//   };

//   return (
//     <View style={{ alignItems: "center", justifyContent: "center" }}>
//       <IconButton
//         onLongPress={() => onOpen("country")}
//         onPress={handleChangeSort}
//         icon={(props) => (
//           <MaterialIcon
//             name={!sortUp ? "sort-ascending" : "sort-descending"}
//             {...props}
//           />
//         )}
//       />
//       <Picker
//         id="country"
//         data={data}
//         searchable={true}
//         label="Select Country"
//         setSelected={setSelected}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   active: {
//     backgroundColor: "#C63031",
//     color: "#ffffff",
//   },
//   default: {
//     backgroundColor: "#ffffff",
//     color: "#000000",
//   },
// });
