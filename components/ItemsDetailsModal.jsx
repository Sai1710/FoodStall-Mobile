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
import { AntDesign } from "@expo/vector-icons";

const ItemDetailsModal = ({ modalVisible, setModalVisible, item }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";
  const [quantity, setQuantity] = useState(0);

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
              <Text style={styles.price}>${item.price}</Text>
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
              }}
            >
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                  setQuantity((prev) => prev - 1);
                }}
              >
                <AntDesign name="minuscircleo" color="#2F855A" size={25} />
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 10, fontWeight: "bold" }}>
                {quantity}
              </Text>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                  setQuantity((prev) => prev + 1);
                }}
              >
                <AntDesign name="pluscircleo" color="#2F855A" size={25} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible((prev) => !prev);
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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
