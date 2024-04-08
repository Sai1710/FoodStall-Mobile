import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import NavBar from "../../Components/Custom/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomerProfile = () => {
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

export default CustomerProfile;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
