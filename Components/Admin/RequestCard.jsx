import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RequestCard = ({ data }) => {
  return (
    <Pressable
      className={`flex-1 bg-white rounded shadow-md p-2 m-2`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Image
        source={require("../../assets/ChineseFood.jpg")}
        className={`w-full h-44 rounded mb-2`}
      />
      <View className="flex-row align-middle justify-between m-1">
        <Text className={`text-sm my-1 text-center font-bold text-[#047857]`}>
          {data.stall_name}
        </Text>
        <TouchableOpacity className="self-center bg-[#047857] p-1 rounded">
          <Ionicons name="eye" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default RequestCard;
