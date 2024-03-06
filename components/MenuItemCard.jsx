import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import ItemDetailsModal from "./ItemsDetailsModal";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const MenuItemCard = ({ item }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";

  const [modalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(false);

  return (
    <>
      <ItemDetailsModal
        item={item}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.innerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              borderRadius: 100,
              borderWidth: 1,
              borderColor: item.item_type === "veg" ? "green" : "red",
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: item.item_type === "veg" ? "green" : "red",
                borderRadius: 100,
                margin: 2,
              }}
            ></View>
          </View>
          <Pressable
            onPress={() => {
              setFavorite((prev) => !prev);
            }}
          >
            <MaterialIcons
              name={!favorite ? "favorite-border" : "favorite"}
              size={20}
              color={!favorite ? "black" : "red"}
            />
          </Pressable>
        </View>
        <View style={styles.imgContainer}>
          <Image
            source={require("../assets/ChineseFood.jpg")}
            style={styles.image}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>$ {item.price}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible((prev) => !prev);
              }}
            >
              <Ionicons name="add-circle" color="#2F855A" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 5,
    marginLeft: 3,
    marginTop: 5,
  },
  priceText: {
    color: "#2F855A",
    fontWeight: "bold",
    fontSize: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#047857",
    padding: 6,
    borderRadius: 4,
    margin: 0,
    marginTop: 10,
  },

  image: {
    height: 150,
    width: 150,
    alignSelf: "center",
    borderRadius: 160,
  },
  categoryTextContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 5,
    marginLeft: 3,
    marginTop: 10,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  imgContainer: {
    flex: 1,
    marginBottom: 10,
  },
  innerContainer: {
    flex: 1,
    margin: 10,
    borderColor: "grey",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
    height: 255,
  },
});

export default MenuItemCard;
