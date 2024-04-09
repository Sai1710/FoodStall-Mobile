import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import GlobalContext from "../../Context/GlobalContext";
import StallCard from "../../Components/Customer/StallCard";
import CartCard from "../../Components/Customer/CartCard";

const CustomerCategoryStalls = ({ route }) => {
  const { vendors, id } = route.params;
  //   const [stalls, setStalls] = useState(data);
  //   const [displayedStalls, setDisplayedStalls] = useState(data);
  const { cart } = useContext(GlobalContext);
  function renderItem(itemData) {
    return <StallCard data={itemData.item} categoryId={id} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="FoodStall" />
      <View className="mx-6 my-2">
        <Text className="font-bold text-xl text-[#047857]">Stalls</Text>
      </View>

      {vendors?.length !== 0 ? (
        <FlatList
          data={vendors}
          renderItem={renderItem}
          className="m-2"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Stalls Found</Text>
        </View>
      )}
      {cart?.cart_items?.length !== 0 && <CartCard />}
    </SafeAreaView>
  );
};

export default CustomerCategoryStalls;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
