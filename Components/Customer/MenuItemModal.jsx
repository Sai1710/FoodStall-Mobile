import React, { useContext, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalContext from "../../Context/GlobalContext";

const MenuItemModal = ({ modalVisible, setModalVisible, item }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";
  const [quantity, setQuantity] = useState(0);

  const { handleAdd } = useContext(GlobalContext);

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View
        className=" w-full h-full bg-black bg-opacity-50 flex items-end justify-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View className="w-full bg-white rounded-t-3xl p-4">
          <Image
            source={require("../../assets/ChineseFood.jpg")}
            className="w-full h-48 object-cover rounded-xl"
          />
          <View className="flex flex-row justify-between items-center mt-4">
            <View className="flex flex-row items-center">
              <Image
                source={
                  item.item_type === "Veg"
                    ? require("../../assets/VEG.png")
                    : require("../../assets/NONVEG.png")
                }
                className="h-5 w-5 mr-2"
              />
              <Text className="text-lg font-bold">{item.name}</Text>
            </View>
            <Text className="text-lg font-bold text-green-700">
              ₹{item.price}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between mt-4">
            <View className="flex flex-row items-center justify-around bg-gray-100 p-2 rounded-lg border border-green-700 mr-2">
              <TouchableOpacity
                onPress={() => {
                  if (quantity > 0) {
                    setQuantity((prev) => prev - 1);
                  }
                }}
              >
                <AntDesign name="minuscircleo" size={24} color="#2F855A" />
              </TouchableOpacity>
              <Text className="font-bold text-lg mx-2">{quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  setQuantity((prev) => prev + 1);
                }}
              >
                <AntDesign name="pluscircleo" size={24} color="#2F855A" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="flex flex-row items-center flex-1 justify-center ml-2 bg-green-700 p-2 rounded-lg border border-green-700"
              onPress={handleAdd}
            >
              <Text className="font-bold text-lg text-white mx-2">
                {quantity === 0 ? "Add Item" : "₹ " + quantity * item.price}
              </Text>
              <AntDesign name="shoppingcart" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MenuItemModal;
