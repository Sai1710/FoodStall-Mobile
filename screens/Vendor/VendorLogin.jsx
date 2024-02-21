import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import DEFAULT_URL from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VendorLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setAccessToken = async (res) => {
    await AsyncStorage.setItem("access-token", res.data.vendor.access_token);
  };

  async function handleSubmit() {
    const token = await AsyncStorage.getItem("access-token");
    try {
      const formData = new FormData();
      formData.append("vendor[email]", email);
      formData.append("vendor[password]", password);
      formData.append(
        "client_id",
        "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI"
      );

      axios
        .post(
          `${DEFAULT_URL}/api/v1/vendor/login`,
          {
            vendor: {
              email: email,
              password: password,
            },
            client_id: "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI",
          },

          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            navigation.navigate("vendor-menu");
            setAccessToken(res);
          }
        })
        .catch((err) => {
          console.error("Error in Axios request:", err);
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-green-100">
      {/* <ImageBackground */}
      {/* source={require("../../assets/VendorLoginBack.png")}
      style=
      {{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        width: 450,
      }} 
      blurRadius={5}>*/}
      <View className="w-4/5 bg-white p-5 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center mb-5">
          Welcome Back!
        </Text>
        <Text className="text-sm font-semibold text-center mb-5">
          Enter your Credentials
        </Text>
        <TextInput
          className="border-gray-300 p-3 mb-4 rounded-lg"
          style={{ borderWidth: 1 }}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          className="border-gray-300 p-3 mb-6 rounded-lg"
          style={{ borderWidth: 1 }}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          className="bg-green-900 py-3 rounded-lg"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Login
          </Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center mt-5">
          <View
            style={{
              backgroundColor: "#333",
              height: 1,
              flex: 1,
            }}
            className="m-2"
          ></View>
          <Text className="mb-3 font-semibold">Or Login with</Text>
          <View
            style={{ backgroundColor: "#333", height: 1, flex: 1 }}
            className="m-2"
          ></View>
        </View>

        <View className="flex-row justify-center items-center mt-10 gap-7">
          <View
            className="flex border-solid border-slate-400 p-3 hover:cursor-pointer rounded-full"
            style={{
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View className="mr-1 ">
              <Image
                source={require("../../assets/google.png")}
                style={{ height: 16, width: 16 }}
              />
            </View>
          </View>
          <View
            className="flex border-solid border-slate-400 p-3  hover:cursor-pointer rounded-full"
            style={{
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View className="mr-1">
              <Image
                source={require("../../assets/apple.png")}
                style={{ width: 16, height: 16 }}
              />
            </View>
          </View>
        </View>
        <Pressable className="mt-10 mb-4">
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#14532d",
              fontSize: 19,
            }}
          >
            SignUp Instead?
          </Text>
        </Pressable>
      </View>
      {/* </ImageBackground> */}
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
