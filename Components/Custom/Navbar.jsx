import React from "react";
import { View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function NavBar({ title }) {
  return (
    <View className={` p-4 flex-row align-middle justify-between mx-2`}>
      {title !== "QuickCrave" ? (
        <>
          <Text className={`text-[#1d543a] text-xl font-bold flex-1`}>
            {title}
          </Text>
        </>
      ) : (
        <Text className={`text-[#1d543a] text-3xl font-bold flex-1`}>
          Quick<Text className="text-black">Crave</Text>
        </Text>
      )}
    </View>
  );
}
