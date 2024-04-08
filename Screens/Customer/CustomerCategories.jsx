import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import GlobalContext from "../../Context/GlobalContext";
import CategoryCard from "../../Components/Custom/CategoryCard";

const CustomerCategories = () => {
  const { categories, fetchCategories } = useContext(GlobalContext);
  useEffect(() => {
    fetchCategories();
  }, []);
  const renderItem = (itemData) => {
    return <CategoryCard data={itemData.item} role="customer" />;
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="FoodStall" />
      <View className="mx-6 my-2">
        <Text className="font-bold text-xl text-[#047857]">Categories</Text>
      </View>

      {categories?.length !== 0 ? (
        <FlatList
          data={categories}
          renderItem={renderItem}
          numColumns={2}
          className="m-2"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Categories Found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CustomerCategories;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
