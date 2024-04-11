import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import CartCard from "../../Components/Customer/CartCard";
import GlobalContext from "../../Context/GlobalContext";

const CustomerStalls = () => {
  const { cart } = useContext(GlobalContext);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="QuickCrave" />
      {Object.keys(cart).length !== 0 && <CartCard />}
    </SafeAreaView>
  );
};

export default CustomerStalls;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
