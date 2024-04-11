import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation, CommonActions } from "@react-navigation/native";

const AdminProfile = () => {
  const navigation = useNavigation();
  const logOut = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "LoginPage" }],
      })
    );
  };
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <NavBar title="QuickCrave" />
      <Button title="Logout" onPress={logOut} />
    </SafeAreaView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
