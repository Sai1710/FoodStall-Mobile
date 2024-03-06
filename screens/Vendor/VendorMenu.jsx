import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import ItemCard from "../../components/ItemCard";
import axios from "axios";
import DEFAULT_URL from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import Navbar from "../../components/Navbar";

const VendorMenu = ({ navigation }) => {
  const [requestCategory, setRequestCategory] = useState("pending");
  const [menu, setMenu] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const options = [
    { Name: "Vendor Menu", page: "vendor-menu" },
    { Name: "Vendor Orders", page: "vendor-orders" },
  ];

  const fetchMenu = async () => {
    const token = await AsyncStorage.getItem("access-token");
    console.log(token);
    try {
      axios
        .get(`${DEFAULT_URL}/api/v1/vendor/food_items`, {
          headers: {
            Authorization: "Bearer " + token,
            "ngrok-skip-browser-warning": true,
          },
        })
        .then((res) => {
          console.log("Fetched data successfully:", res.data.food_items);
          setMenu(res.data.food_items);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <View style={{ backgroundColor: "#E6FFEC", flex: 1, marginTop: 48 }}>
      <Navbar options={options} activeOption="Vendor Menu" />
      <StatusBar backgroundColor="white" />
      <View style={{ flex: 1, padding: 16, marginTop: 8 }}>
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 54 }}>
            Welcome Back,
          </Text>
          <Text style={{ fontWeight: "bold", color: "#0F9D58", fontSize: 36 }}>
            Vendor
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 8,
              marginTop: 16,
            }}
          >
            <Text
              style={{
                flex: 1,
                fontWeight: "bold",
                fontSize: 24,
                color: "#14532D",
              }}
            >
              Your Menu
            </Text>
            <Pressable
              style={{
                backgroundColor: "#14532D",
                borderRadius: 8,
                padding: 8,
              }}
              onPress={() => navigation.navigate("add-item")}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                  paddingHorizontal: 8,
                }}
              >
                Add Item
              </Text>
            </Pressable>
          </View>
        </View>
        <ScrollView style={{ marginTop: 16 }}>
          {menu.map((item) => {
            return (
              <ItemCard
                key={item.id}
                data={item}
                fetchMenu={fetchMenu}
                navigation={navigation}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default VendorMenu;
