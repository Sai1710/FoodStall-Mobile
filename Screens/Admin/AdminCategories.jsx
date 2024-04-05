import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import NavBar from "../../Components/Custom/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import CategoryCard from "../../Components/Admin/CategoryCard";

const AdminCategories = () => {
  const categories = [
    { id: 1, name: "Italian Cuisine" },
    { id: 2, name: "Mexican Food" },
    { id: 3, name: "Japanese Dishes" },
    { id: 4, name: "Vegetarian Options" },
    { id: 5, name: "Seafood Specialties" },
  ];

  const renderItem = (itemData) => {
    return <CategoryCard data={itemData.item} />;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="FoodStall" />
      <View className="mx-6 my-2">
        <Text className="font-bold text-xl text-[#047857]">Categories</Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderItem}
        numColumns={2}
        className="m-2"
        showsVerticalScrollIndicator={false}
      />
      <View className="items-center absolute bottom-10 left-0 right-0 mx-auto">
        <TouchableOpacity className="bg-white rounded-full">
          <FontAwesome6 name="circle-plus" size={70} color="#047857" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminCategories;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
