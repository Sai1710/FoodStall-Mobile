import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Navbar = () => {
  return (
    <View className="bg-blue-500 py-4 px-6 flex-row justify-between items-center">
      <Text className="text-white text-lg font-bold">FoodM</Text>
      <View className="flex-row">
        <TouchableOpacity className="mr-4">
          <Text className="text-white">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-white">About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
