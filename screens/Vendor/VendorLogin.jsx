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
import validationSchema from "../../Schemas/ValidationSchema";
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

  const setAccessToken = async (res) => {
    await AsyncStorage.setItem("access-token", res.data.vendor.access_token);
  };

  const options = [
    { Name: "Vendor Orders", page: "vendor-orders" },
    { Name: "Vendor Menu", page: "vendor-menu" },
  ];

  async function handleLogin(values) {
    const token = await AsyncStorage.getItem("access-token");
    try {
      axios
        .post(`${DEFAULT_URL}/api/v1/vendor/login`, {
          vendor: {
            email: values.email,
            password: values.password,
          },
          client_id: "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI",
        })
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
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
  error: {
    color: "red",
    marginBottom: 5,
  },
});
