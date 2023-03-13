import React, {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View, Text } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Chip, Stack, Button } from "@react-native-material/core";

export interface EmployeeSortMenuProps {
  handleChangeSort?: () => void;
  handleSortMenu?: (sortBy: string) => void;
  handleOpen: (isOpen: boolean) => void;
  sortUp?: boolean | null;
  sortBy?: string | null;
  isOpen: boolean;
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
  handleSortMenu,
  handleOpen,
  sortBy,
  sortUp,
  isOpen,
}: EmployeeSortMenuProps) {
  const [isAscending, setIsAscending] = useState<boolean | null>(null);
  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.snapToIndex(0);
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [isOpen, bottomSheetModalRef.current]);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    //bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  function handleSetSort(id: string) {
    // handleSortMenu(id);
  }

  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => handleOpen(false)}
      index={-1}
      style={styles.bottomSheet}
      // backdropComponent={(props) => (
      //   <BottomSheetBackdrop
      //     disappearsOnIndex={-1}
      //     appearsOnIndex={0}
      //     opacity={0}
      //     {...props}
      //     onPress={() => alert('f')}
      //   />
      // )}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View>
          <Text>Sort direction: </Text>
            <Button
              variant={isAscending ? "contained" : "outlined"}
              title="Ascending"
            />
            <Button
            variant={isAscending !== null && !isAscending ? "contained" : "outlined"}
              title="Descending"
            />

          <Button title="Descending" />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "white",
    borderRadius: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
  },
  bottomSheetContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  directionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
});
