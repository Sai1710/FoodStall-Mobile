import React from "react";
import { View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function NavBar({ title }) {
  return (
    <View className={`bg-white p-4 flex-row align-middle justify-between`}>
      <Text className={`text-[#047857] text-2xl font-bold flex-1`}>
        {title}
      </Text>
    </View>
  );
}
