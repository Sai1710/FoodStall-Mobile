import { StatusBar } from "expo-status-bar";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

const HomePage = ({ navigation }) => {
  const handleCustomerLogin = () => {
    navigation.navigate("customer-login");
  };

  const handleVendorLogin = () => {
    navigation.navigate("vendor-login");
  };

  const handleAdminLogin = () => {
    navigation.navigate("admin-login");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E5FFEC",
      }}
    >
      <StatusBar backgroundColor="#fff" />
      <View
        source={require("../assets/VendorRegistrationBack.png")}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
        }}
        blurRadius={3}
      >
        <View>
          <Text
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "#000",
              textAlign: "center",
            }}
          >
            Welcome to Food Stall!
          </Text>
          <View>
            <TouchableOpacity
              style={{
                marginTop: 32,
                padding: 16,
                backgroundColor: "#fff",
                borderRadius: 8,
                borderWidth: 2,
                borderColor: "#065F46",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleCustomerLogin}
            >
              <FontAwesome6
                name="person"
                size={20}
                color="#065f46"
                style={{ margin: "auto", padding: 3 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#065F46",
                  textAlign: "center",
                }}
              >
                Login as a Customer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 16,
                padding: 16,
                backgroundColor: "white",
                borderRadius: 8,
                borderWidth: 2,
                borderColor: "#065F46",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleVendorLogin}
            >
              <Entypo
                name="shop"
                size={20}
                color="#065f46"
                style={{ margin: "auto", padding: 3 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#065F46",
                  textAlign: "center",
                }}
              >
                Login as a Vendor
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 16,
                padding: 16,
                backgroundColor: "white",
                borderRadius: 8,
                borderWidth: 2,
                borderColor: "#065F46",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleAdminLogin}
            >
              <Ionicons
                name="person"
                size={20}
                color="#065f46"
                style={{ margin: "auto", padding: 3 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#065F46",
                  textAlign: "center",
                }}
              >
                Login as an Admin
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
