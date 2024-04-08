import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";

const VendorProfile = () => {
  const navigation = useNavigation();

  const logOut = async () => {
    await AsyncStorage.clear();

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: "LoginPage" }, //to go to initial stack screen
        ],
      })
    );
  };
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <NavBar title="FoodStall" />
      <Button title="Logout" onPress={logOut} />
    </SafeAreaView>
  );
};

export default VendorProfile;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
