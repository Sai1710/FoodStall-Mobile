import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Menu({ options, activeOption, onChange }) {
  const navigation = useNavigation();
  function onChange(option) {
    navigation.replace(option.page);
  }
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.page}
          style={[
            styles.option,
            option.Name === activeOption && styles.activeOption,
          ]}
          onPress={() => onChange(option)}
        >
          <Text style={styles.optionText}>{option.Name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#047857",
    margin: 0,
    height: 50,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  activeOption: {
    borderBottomWidth: 3,
    borderBottomColor: "white",
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "800",
  },
});
