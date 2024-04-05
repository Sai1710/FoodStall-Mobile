import { useState, useContext } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  ImageBackground,
  StatusBar,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import VendorHome from "./Vendor/VendorHome";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("customer");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#FFFFFF"} />
      {/* <ImageBackground
        source={require("../../assets/LoginScreen.jpg")}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
          width: 450,
        }}
        blurRadius={3}
      > */}
      <View style={styles.card}>
        <Text className="font-bold text-2xl mb-3 text-center text-[#047857]">
          FoodStall
        </Text>
        <Text style={styles.subtitle}>
          Explore food from different cuisines !!!
        </Text>
        <View className="flex-row align-middle justify-center mb-6">
          <Pressable
            className={
              mode === "customer"
                ? "flex-1 border-b-2 border-[#047857]"
                : "flex-1"
            }
            onPress={() => {
              setMode("customer");
            }}
          >
            <Text className="text-center text-[#047857] text-lg font-bold p-2">
              Customer
            </Text>
          </Pressable>

          <Pressable
            className={
              mode === "vendor"
                ? "flex-1 border-b-2 border-[#047857]"
                : "flex-1"
            }
            onPress={() => {
              setMode("vendor");
            }}
          >
            <Text className="text-center text-[#047857] text-lg font-bold p-2">
              Vendor
            </Text>
          </Pressable>
          <Pressable
            className={
              mode === "admin" ? "flex-1 border-b-2 border-[#047857]" : "flex-1"
            }
            onPress={() => {
              setMode("admin");
            }}
          >
            <Text className="text-center text-[#047857] text-lg font-bold p-2">
              Admin
            </Text>
          </Pressable>
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AdminHome");
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or Login with</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.socialLogin}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/google.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/apple.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={styles.signupLink}
            onPress={() => {
              console.log("Forgot Password");
            }}
          >
            <Text style={styles.signupText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupLink}
            onPress={() => navigation.navigate("customer-registration")}
          >
            <Text style={styles.signupText}>Sign Up Instead?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LottieView
        source={require("../assets/Login.json")}
        autoPlay
        style={{
          width: "100%",
          flex: 0.6,
          marginTop: 30,
        }}
      />
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    width: "90%",
    backgroundColor: "rgb(255,255,255)",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 40, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#047857",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  dividerLine: {
    backgroundColor: "#333",
    height: 1,
    flex: 1,
    marginHorizontal: 5,
  },
  dividerText: {
    fontWeight: "600",
    marginHorizontal: 5,
  },
  socialLogin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#778CA3",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#047857",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});
