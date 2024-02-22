import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import DashboardCard from "../../components/DashboardCard";
import OrderCard from "../../components/OrderCard";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

const VendorOrders = ({ navigation }) => {
  const customersData = [
    {
      name: "John Doe",
      category: "Chinese",
      item: {
        name: "Tacos",
        item_type: "Veg",
        sub_type: ["jain", "swaminarayan", "regular"],
        taste: ["spicy", "medium", "light"],
        tags: ["best_seller", "kids", "starter", "yummy", "healthy"],
        price: 100,
      },
      payment: "Credit Card",
      status: "Delivered",
      date_time: "2024-02-12 15:30:00",
    },
    {
      name: "Jane Smith",
      category: "Punjabi",
      item: {
        name: "Sushi",
        item_type: "Non-Veg",
        sub_type: ["deluxe", "special", "regular"],
        taste: ["salty", "savory", "umami"],
        tags: ["premium", "exotic", "seafood", "chef_special"],
        price: 150,
      },
      payment: "Mobile Wallet",
      status: "Pending",
      date_time: "2024-02-13 18:45:00",
    },
    {
      name: "Mike Johnson",
      category: "Chinese",
      item: {
        name: "Burger",
        item_type: "Non-Veg",
        sub_type: ["classic", "spicy", "cheese-filled"],
        taste: ["salty", "umami", "rich"],
        tags: ["classic_favorites", "fast_food", "meaty"],
        price: 120,
      },
      payment: "Cash on Delivery",
      status: "In Progress",
      date_time: "2024-02-14 12:15:00",
    },
    {
      name: "Sarah Williams",
      category: "Chinese",
      item: {
        name: "Steak",
        item_type: "Non-Veg",
        sub_type: ["medium", "well_done", "rare"],
        taste: ["savory", "spicy", "smoky"],
        tags: ["premium_cut", "grilled", "special_occasion"],
        price: 180,
      },
      payment: "Credit Card",
      status: "Delivered",
      date_time: "2024-02-15 20:00:00",
    },
    {
      name: "Chris Anderson",
      category: "Chinese",
      item: {
        name: "Pizza",
        item_type: "Veg",
        sub_type: ["veggie_supreme", "margherita", "hawaiian"],
        taste: ["cheesy", "crispy", "savory"],
        tags: ["family_size", "party_favorite", "classic"],
        price: 90,
      },
      payment: "Online Transfer",
      status: "Delivered",
      date_time: "2024-02-16 16:30:00",
    },
    // Add more customers as needed
  ];
  const [requestCategory, setRequestCategory] = useState("pending");
  const [displayedOrders, setDisplayedOrders] = useState([]);

  const categorizeRequests = (category) => {
    const orders = customersData.filter((item) => item.status === category);
    console.log(orders);
    setDisplayedOrders(orders);
  };

  useEffect(() => {
    categorizeRequests("Pending");
  }, []);

  return (
    <View style={{ backgroundColor: "#E5FFEC", flex: 1, marginTop: 48 }}>
      <StatusBar backgroundColor="#fff" />
      <View style={{ padding: 16, marginTop: 32 }}>
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <Text style={{ fontSize: 48, fontWeight: "bold" }}>
            Welcome Back,
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#1A523C" }}>
            Vendor
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", marginLeft: 16, marginTop: 10 }}>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#14532D" }}
            >
              Your Orders
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <Pressable
              style={{
                flex: 1,
                marginHorizontal: 4,
                paddingVertical: 8,
                borderRadius: 4,
                backgroundColor:
                  requestCategory === "pending" ? "#14532D" : "#888",
              }}
              onPress={() => {
                setRequestCategory("pending");
                categorizeRequests("Pending");
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Pending
              </Text>
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                marginHorizontal: 4,
                paddingVertical: 8,
                borderRadius: 4,
                backgroundColor:
                  requestCategory === "in-progress" ? "#14532D" : "#888",
              }}
              onPress={() => {
                setRequestCategory("in-progress");
                categorizeRequests("In Progress");
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                In Progress
              </Text>
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                marginHorizontal: 4,
                paddingVertical: 8,
                borderRadius: 4,
                backgroundColor:
                  requestCategory === "delivered" ? "#14532D" : "#888",
              }}
              onPress={() => {
                setRequestCategory("delivered");
                categorizeRequests("Delivered");
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Delivered
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <ScrollView>
        {displayedOrders.map((item) => {
          return <OrderCard key={item.date_time} data={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default VendorOrders;
