import React from "react";
import { View, Text, Pressable, Image } from "react-native";

const DashboardCard = ({ title, description, page, handlePress }) => {
  return (
    <Pressable
      className="flex-1 bg-white rounded-lg shadow-md p-4 m-1"
      onPress={() => {
        handlePress(page);
      }}
    >
      <View className="flex-row justify-between">
        <Text className="text-2xl font-bold mb-2 text-green-900">{title}</Text>
        <Text className="text-2xl text-green-600" style={{ fontWeight: "900" }}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export default DashboardCard;
