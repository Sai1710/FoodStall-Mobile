import { useState } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  ImageBackground,
  StatusBar,
} from "react-native";
import DEFAULT_URL from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function AdminLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setAccessToken = async (res) => {
    await AsyncStorage.setItem("access-token", res.data.admin.access_token);
  };

  const handleLogin = async () => {
    try {
      axios
        .post(`${DEFAULT_URL}/api/v1/admin/login`, {
          admin: {
            email: email,
            password: password,
          },
          client_id: "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI",
        })
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            navigation.navigate("admin-dashboard");
            setAccessToken(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error logging in:", error);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar backgroundColor={"#000"}></StatusBar>
      <ImageBackground
        source={require("../../assets/AdminBack.png")}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
          width: 450,
        }}
        blurRadius={5}
      >
        <View className="w-4/5 bg-white p-5 rounded-lg shadow-md">
          <Text className="text-2xl font-bold text-center mb-5">
            Admin Login
          </Text>
          <Text className="text-sm font-semibold text-center mb-5">
            Enter your Credentials to access your account
          </Text>
          <TextInput
            className="border-gray-300 p-3 mb-4 rounded-lg"
            style={{ borderWidth: 1 }}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            secureTextEntry={true}
            className="border-gray-300 p-3 mb-4 rounded-lg"
            style={{ borderWidth: 1 }}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
          />
          <TouchableOpacity
            className="bg-green-900 py-3 rounded-lg"
            onPress={handleLogin}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
