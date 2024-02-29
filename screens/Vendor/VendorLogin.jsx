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
import LottieView from "lottie-react-native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { loginValidationSchema } from "../../Schemas/ValidationSchema";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import DEFAULT_URL from "../../config";
import Navbar from "../../components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

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
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Sign In Failed",
            textBody: "Invalid Credentials",
            button: "Close",
          });
        });
    } catch (error) {
      console.error("Error logging in:", error);
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Sign In Failed",
        textBody: "Invalid Credentials",
        button: "Close",
      });
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      <StatusBar backgroundColor="#fff" />
      {/* <ImageBackground
        source={require("../../assets/VendorLoginBack.jpg")}
        imageStyle={styles.headingImage}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
        }}
        blurRadius={3}
      > */}
      <View
        style={{
          width: "90%",
          backgroundColor: "rgb(255,255,255)",
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
          validationSchema={loginValidationSchema}
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate("vendor-registration")}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#047857",
                textAlign: "center",
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate("vendor-registration")}
          >
            <Text
              style={{
                fontSize: 14,
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
      <LottieView
        source={require("../../assets/VendorLogin.json")}
        autoPlay
        loop
        style={{
          width: "100%",
          flex: 0.5,
          marginTop: 20,
        }}
      />
      {/* </ImageBackground> */}
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
