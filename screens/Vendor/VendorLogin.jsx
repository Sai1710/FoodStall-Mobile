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
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import DEFAULT_URL from "../../config";
import Navbar from "../../components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";

export default function VendorLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validationSchema = Yup.object().shape({
    name: Yup.string().label("Name").required(),
    email: Yup.string().label("Email").email().required(),
  });

  const setAccessToken = async (res) => {
    await AsyncStorage.setItem("access-token", res.data.vendor.access_token);
  };

  const options = [
    { Name: "Vendor Orders", page: "vendor-orders" },
    { Name: "Vendor Menu", page: "vendor-menu" },
  ];

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
            Toast;
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E5FFEC",
      }}
    >
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
          Welcome Back!
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Enter your Credentials
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
          style={{
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 5,
            padding: 10,
            marginBottom: 20,
          }}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          style={{ backgroundColor: "#047857", padding: 12, borderRadius: 8 }}
          onPress={handleSubmit}
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
          onPress={() => navigation.navigate("vendor-registration")}
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
  error: {
    color: "red",
    marginBottom: 5,
  },
});
