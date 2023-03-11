import React, {
  forwardRef,
  Ref,
  useCallback,
  useMemo,
  useState,
} from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export interface EmployeeSortMenuProps {
  handleChangeSort?: () => void;
  handleSortMenu?: (sortBy: string) => void;
  handleOpen: (isOpen: boolean) => void;
  sortUp?: boolean | null;
  sortBy?: string | null;
  isOpen?: boolean;
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
const EmployeeSortMenu = forwardRef(
  (
    { handleChangeSort, handleSortMenu, handleOpen, sortBy, sortUp }: EmployeeSortMenuProps,
    ref: Ref<BottomSheetModal> | undefined
  ) => {

    // variables
    const snapPoints = useMemo(() => [ "50%", "70%"], []);

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
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => handleOpen(false)}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

EmployeeSortMenu.displayName = "EmployeeSortMenu";

export default EmployeeSortMenu;

const styles = StyleSheet.create({
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
