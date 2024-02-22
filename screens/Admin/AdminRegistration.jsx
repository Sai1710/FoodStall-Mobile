import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import DEFAULT_URL from "../../config";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
export default function AdminRegistration({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (confirmPassword == password) {
      try {
        axios
          .post(`${DEFAULT_URL}/api/v1/admin/sign_up`, {
            admin: {
              email: email,
              password: password,
            },
            client_id: "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI",
          })
          .then((res) => {
            console.log(res);
            navigation.navigate("admin-login");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      alert("Passwords don't match");
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <View className="flex-1 justify-center items-center bg-green-100">
      <StatusBar backgroundColor={"#fff"}></StatusBar>

      {/* <ImageBackground
        source={require("../../assets/AdminBack.png")}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
          width: 450,
        }}
        blurRadius={5}
      > */}
      <View className="w-4/5 bg-white p-5 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center mb-5">
          Admin Registration
        </Text>
        <Text className="text-sm font-semibold text-center mb-5">
          Welcome to FoodStall !
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
        <TextInput
          secureTextEntry={true}
          className="border-gray-300 p-3 mb-4 rounded-lg"
          style={{ borderWidth: 1 }}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
        />
        <TouchableOpacity
          className="bg-green-900 py-3 rounded-lg"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Register
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#333",
              height: 1,
              flex: 1,
              marginHorizontal: 5,
            }}
          />
          <Text style={{ fontWeight: "600", marginHorizontal: 5 }}>
            Or Login with
          </Text>
          <View
            style={{
              backgroundColor: "#333",
              height: 1,
              flex: 1,
              marginHorizontal: 5,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "#778CA3",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 5,
            }}
          >
            <Image
              source={require("../../assets/google.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#778CA3",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 5,
            }}
          >
            <Image
              source={require("../../assets/apple.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("admin-login")}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#047857",
              textAlign: "center",
            }}
          >
            Login Instead?
          </Text>
        </TouchableOpacity>
      </View>
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
