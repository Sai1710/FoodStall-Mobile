import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NavBar from "../../Components/Custom/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomerProfile = () => {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <NavBar title="FoodStall" />
    </SafeAreaView>
  );
};

export default CustomerProfile;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
