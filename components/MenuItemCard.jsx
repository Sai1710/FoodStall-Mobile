import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import ItemDetailsModal from "./ItemsDetailsModal";

const MenuItemCard = ({ item }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ItemDetailsModal
        item={item}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setModalVisible((prev) => !prev);
        }}
      >
        <Image source={{ uri: link }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text
            style={{
              fontSize: 14,
              color: item.item_type.toUpperCase() === "VEG" ? "green" : "red",
            }}
          >
            {item.item_type.toUpperCase()}
          </Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 20,
    marginVertical: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "black",
  },
  addButton: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MenuItemCard;
