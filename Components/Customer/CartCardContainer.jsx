import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import CartItemCard from "./CartItemCard";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CartCardContainer = ({ stall, items }) => {
  const renderItem = (itemData) => {
    return <CartItemCard item={itemData.item} />;
  };
  const navigation = useNavigation();

  return (
    <View className="m-4 border-0.5 p-3 rounded border-green-800">
      <View className="flex-row align-middle justify-between mb-3">
        <Text className="text-lg font-medium text-green-800  mx-1 self-center">
          {stall.stall_name}
        </Text>
        <TouchableOpacity
          className="bg-white rounded-full self-center"
          onPress={() => {
            navigation.navigate("StallMenu", { stall: stall, categoryId: -1 });
          }}
        >
          <FontAwesome6 name="circle-plus" size={40} color="#047857" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View className="flex-row justify-between align-middle my-3 mx-1">
        <Text className="font-semibold">Grand Total:</Text>
        <Text className="font-bold">
          $ {items.reduce((total, item) => total + item.price, 0)}
        </Text>
      </View>
      <TouchableOpacity className="bg-green-800 rounded-lg p-2">
        <Text className="text-white text-lg font-bold text-center">Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartCardContainer;
