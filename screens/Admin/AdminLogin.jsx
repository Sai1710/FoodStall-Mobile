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
  Image,
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
            navigation.navigate("stall-requests");
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E5FFEC",
      }}
    >
      <StatusBar backgroundColor={"#FFFFFF"} />
      <View
        style={{
          width: "80%",
          backgroundColor: "#FFFFFF",
          padding: 20,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Admin Login
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Enter your Credentials to access your account
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          secureTextEntry={true}
          style={{
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
        <TouchableOpacity
          style={{ backgroundColor: "#047857", padding: 12, borderRadius: 8 }}
          onPress={handleLogin}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Login
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
          onPress={() => navigation.navigate("admin-registration")}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#047857",
              textAlign: "center",
            }}
          >
            Sign Up Instead?
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
