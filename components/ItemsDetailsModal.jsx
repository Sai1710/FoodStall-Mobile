import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import DEFAULT_URL from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemDetailsModal = ({ modalVisible, setModalVisible, item }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";
  const [quantity, setQuantity] = useState(0);

  const setCartId = async (res) => {
    await AsyncStorage.setItem("cart-id", JSON.stringify(res.data.cart.id));
  };

  const createCart = async () => {
    const token = await AsyncStorage.getItem("access-token");

    try {
      axios
        .post(`${DEFAULT_URL}/api/v1/customer/carts`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res);
          setCartId(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async () => {
    const token = await AsyncStorage.getItem("access-token");
    if (quantity != 0) {
      try {
        axios
          .post(
            `${DEFAULT_URL}/api/v1/customer/carts/cart_items`,
            {
              cart_item: {
                food_item_id: item.id,
                quantity: quantity,
                price: quantity * item.price,
              },
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAdd = async () => {
    const cartId = await AsyncStorage.getItem("cart-id");
    console.log(cartId);
    if (cartId === null) {
      createCart();
      addItem();
    } else {
      addItem();
    }
    setModalVisible(false);
  };

  console.log(item);
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <Pressable
        style={styles.modalContainer}
        onPress={() => {
          setModalVisible((prev) => !prev);
        }}
      >
        <View style={styles.modalContent}>
          <Image
            source={require("../assets/ChineseFood.jpg")}
            style={{ width: "100%", height: 200, borderRadius: 20 }}
          />
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={
                  item.item_type === "veg"
                    ? require("../assets/VEG.png")
                    : require("../assets/NONVEG.png")
                }
                style={{ height: 20, width: 20, marginRight: 5 }}
              />
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "#fafafa",
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#2F855A",
                marginRight: 5,
              }}
            >
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                  if (quantity > 0) {
                    setQuantity((prev) => prev - 1);
                  }
                }}
              >
                <AntDesign name="minuscircleo" color="#2F855A" size={30} />
              </TouchableOpacity>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {quantity}
              </Text>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                  setQuantity((prev) => prev + 1);
                }}
              >
                <AntDesign name="pluscircleo" color="#2F855A" size={30} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                marginLeft: 5,
                justifyContent: "center",
                backgroundColor: "#2F855A",
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#2F855A",
              }}
              onPress={handleAdd}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "white",
                }}
              >
                {quantity === 0 ? "Add Item" : "₹ " + quantity * item.price}
              </Text>
              <AntDesign name="shoppingcart" color="#fff" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    display: "flex",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F855A",
    margin: "auto",
  },
  closeButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    borderWidth: 0.2,
    width: "100%",
    margin: 10,
    alignSelf: "center",
  },
});

export default ItemDetailsModal;
