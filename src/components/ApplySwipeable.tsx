import React from "react";
import { Animated, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { PropsWithChildren } from "react";

interface SwipeableProps {
  RightActionIcon: any;
  LeftActionIcon: any;
  rightActionColor: string;
  leftActionColor: string;
}

export default function ApplySwipeable({
  children,
  rightActionColor,
  RightActionIcon,
  leftActionColor,
  LeftActionIcon,
}: PropsWithChildren<SwipeableProps>) {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-120, -100, -100, -99],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <Animated.View
        style={[
          styles.rightAction,
          {
            transform: [{ translateX: trans }],
            backgroundColor: `${rightActionColor}`,
          },
        ]}
      >
        {RightActionIcon}
      </Animated.View>
    );
  };

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [80, 100, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <Animated.View
        style={[
          styles.leftAction,
          {
            transform: [{ translateX: trans }],
            backgroundColor: `${leftActionColor}`,
          },
        ]}
      >
        {LeftActionIcon}
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      rightThreshold={20}
      leftThreshold={20}
      friction={2}
      containerStyle={[styles.container, {}]}

    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  rightAction: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  leftAction: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
