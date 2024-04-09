import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const { height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";

export default function CartCard({ cart }) {
  const clearCartId = async () => {
    await AsyncStorage.removeItem("cart-id");
  };

  const tempCart = {
    cart_items: ["dcnbc", "bcdbvchxb", "bchhsbs"],
  };
  const navigation = useNavigation();

  const deleteCart = async () => {
    const token = await AsyncStorage.getItem("access-token");
    try {
      axios
        .delete(`/api/v1/customer/carts`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable
      className="flex-row items-center align-middle justify-between bg-green-700 p-4 rounded-lg border border-green-700 absolute bottom-2  mx-auto z-10 w-[100%] opacity-95"
      //   className="items-center absolute bottom-10 left-0 right-0 mx-auto"
    >
      <View className="flex-row items-center justify-center">
        <Text className="font-bold text-lg text-white">
          {tempCart.cart_items.length} items in cart
        </Text>
        <AntDesign name="shoppingcart" color="#fff" size={30} />
      </View>
      <TouchableOpacity onPress={deleteCart}>
        <AntDesign name="close" size={20} color="white" />
      </TouchableOpacity>
    </Pressable>
  );
}
