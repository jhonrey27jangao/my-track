import React from "react";
import { View, StyleSheet } from "react-native";

function Spacer({ children }) {
  return <View style={styles.spaces}>{children}</View>;
}

export default Spacer;

const styles = StyleSheet.create({
  spaces: {
    margin: 15,
  },
});
