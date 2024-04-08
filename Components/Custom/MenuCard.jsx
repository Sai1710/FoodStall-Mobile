import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const MenuCard = ({ item, role }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";

  const [modalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(false);
  console.log(item);

  return (
    <View className={`flex-1 p-4 border border-gray-300 rounded mt-4 mx-2`}>
      <View className={`flex-row justify-between items-center mb-2`}>
        <View
          style={{
            borderColor: item.item_type === "veg" ? "green" : "red",
          }}
          className="rounded-full border"
        >
          <View
            style={{
              backgroundColor: item.item_type === "veg" ? "green" : "red",
            }}
            className="w-[10] h-[10] rounded-full m-[2]"
          ></View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setFavorite((prev) => !prev);
          }}
        >
          {role == "customer " ? (
            <MaterialIcons
              name={!favorite ? "favorite-border" : "favorite"}
              size={20}
              color={!favorite ? "black" : "red"}
            />
          ) : (
            <MaterialIcons name="edit" size={24} color="#2F855A" />
          )}
        </TouchableOpacity>
      </View>
      <View className={`mb-2`}>
        <Image
          source={require("../../assets/ChineseFood.jpg")}
          className={`h-36 w-36 rounded-full`}
        />
      </View>

      <View className={`mt-2`}>
        <View className={`flex-row justify-between items-center`}>
          <Text className={`text-base font-semibold`}>{item.name}</Text>
        </View>
        <View className={`flex-row justify-between items-center`}>
          <Text className={`text-green-800 font-semibold text-sm`}>
            $ {item.price}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible((prev) => !prev);
            }}
          >
            {role == "customer" && (
              <Ionicons name="add-circle" color="#2F855A" size={24} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuCard;
