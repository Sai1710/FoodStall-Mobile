import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomerCategories from "./CustomerCategories";
import CustomerStalls from "./CustomerStalls";
import CustomerProfile from "./CustomerProfile";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const CustomerHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
        },

        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "CustomerCategories":
              return (
                <Ionicons
                  name="fast-food"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );
            case "CustomerStalls":
              return (
                <Entypo
                  name="shop"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );
            case "CustomerProfile":
              return (
                <FontAwesome
                  name="user-circle"
                  size={24}
                  color={focused ? "#047857" : "#ccc6c5"}
                />
              );

            default:
              return null;
          }
        },
        tabBarBadgeStyle: { display: "none" },
      })}
    >
      <Tab.Screen name="CustomerCategories" component={CustomerCategories} />
      <Tab.Screen name="CustomerStalls" component={CustomerStalls} />
      <Tab.Screen name="CustomerProfile" component={CustomerProfile} />
    </Tab.Navigator>
  );
};

export default CustomerHome;
