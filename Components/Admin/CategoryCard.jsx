import React, { useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomModal from "../Custom/CustomModal";

const CategoryCard = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
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
      <CustomModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Are you sure you want to delete this category?"
        buttonTitle="Delete"
        buttonColor="red"
      />
      <Image
        source={require("../../assets/ChineseFood.jpg")}
        className={`w-full h-44 rounded mb-2`}
      />
      <View className="flex-row align-middle justify-between m-1">
        <Text className={`text-sm my-1 text-center font-bold text-[#047857]`}>
          {data.name}
        </Text>
        <TouchableOpacity
          className="self-center"
          onPress={() => {
            setModalVisible((prev) => !prev);
          }}
        >
          <MaterialIcons name="delete" size={20} color="#f10000" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default CategoryCard;
