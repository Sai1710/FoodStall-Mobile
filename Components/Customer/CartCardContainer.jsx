import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import CartItemCard from "./CartItemCard"; // Assuming you have a CartItemCard component
import GlobalContext from "../../Context/GlobalContext";

const CartCardContainer = ({ stallName, items }) => {
  const renderItem = (itemData) => {
    return <CartItemCard item={itemData.item} />;
  };

  return (
    <View className="m-4 border-0.5 p-3 rounded border-green-800">
      <Text className="text-lg font-medium text-green-800 mb-3 mx-1">
        {stallName}
      </Text>
      <FlatList data={items} renderItem={renderItem} />
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
