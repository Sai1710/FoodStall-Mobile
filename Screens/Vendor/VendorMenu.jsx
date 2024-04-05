import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";

const VendorMenu = () => {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <NavBar title="FoodStall" />
    </SafeAreaView>
  );
};

export default VendorMenu;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
