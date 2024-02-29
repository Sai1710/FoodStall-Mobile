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
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { Formik } from "formik";
import DEFAULT_URL from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import validationSchema from "../../Schemas/ValidationSchema";
import { loginValidationSchema } from "../../Schemas/ValidationSchema";
import LottieView from "lottie-react-native";

export default function AdminLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setAccessToken = async (res) => {
    await AsyncStorage.setItem("access-token", res.data.admin.access_token);
  };

  const handleLogin = async (values) => {
    try {
      axios
        .post(
          `${DEFAULT_URL}/api/v1/admin/login`,
          {
            admin: {
              email: values.email,
              password: values.password,
            },
            client_id: "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI",
          },
          {
            headers: {
              "ngrok-skip-browser-warning": true,
            },
          }
        )
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            navigation.navigate("stall-requests");
            setAccessToken(res);
          }
        })
        .catch((err) => {
          console.log(err);
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
    setEmail("");
    setPassword("");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#FFFFFF"} />
      <ImageBackground
        source={require("../../assets/VendorRegistration.jpg")}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
          width: 450,
        }}
        blurRadius={3}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Admin Login</Text>
          <Text style={styles.subtitle}>
            Enter your Credentials to access your account
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
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or Login with</Text>
            <View style={styles.dividerLine} />
          </View>
          <View style={styles.socialLogin}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/google.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/apple.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.signupLink}
            onPress={() => navigation.navigate("admin-registration")}
          >
            <Text style={styles.signupText}>Sign Up Instead?</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5FFEC",
  },
  card: {
    width: "80%",
    backgroundColor: "rgb(255,255,255)",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#047857",
    textAlign: "center",
  },
});
