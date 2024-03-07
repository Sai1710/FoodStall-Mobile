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

export default function CartCard({ cart }) {
  const clearCartId = async () => {
    await AsyncStorage.clear("cart-id");
  };

  const deleteCart = async () => {
    const token = await AsyncStorage.getItem("access-token");

    try {
      axios
        .delete(`${DEFAULT_URL}/api/v1/customer/carts`, {
          headers: {
            Authorization: "Bearer " + token,
            "ngrok-skip-browser-warning": true,
          },
        })
        .then((response) => {
          console.log(response);
          // clearCartId();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      // clearCartId();
    }
  };
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#2F855A",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#2F855A",
        position: "absolute",
        bottom: height * 0.1, // Adjust this value as needed to position the hover box
        left: "5%",
        zIndex: 2,
        width: "90%",
        opacity: 0.95,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: "bold",
            fontSize: 16,
            color: "white",
          }}
        >
          {cart.length} items in cart
        </Text>
        <AntDesign name="shoppingcart" color="#fff" size={30} />
      </View>
      <TouchableOpacity onPress={deleteCart}>
        <AntDesign name="close" size={20} color="white" />
      </TouchableOpacity>
    </Pressable>
  );
}
