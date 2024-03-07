import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const { height } = Dimensions.get("window");

export default function CartCard({ cart }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
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
        opacity: 0.9,
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
      <AntDesign name="close" size={20} color="white" />
    </TouchableOpacity>
  );
}
