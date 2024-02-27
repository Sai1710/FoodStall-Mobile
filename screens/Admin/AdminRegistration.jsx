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
import { Formik } from "formik";
import { StatusBar } from "expo-status-bar";
import AdminRegistrationValidationSchema from "../../Schemas/ValidationSchema";
export default function AdminRegistration({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (values) => {
    console.log(values);
    try {
      axios
        .post(`${DEFAULT_URL}/api/v1/admin/sign_up`, {
          admin: {
            email: values.email,
            password: values.password,
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
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#fff"} />
      <View style={styles.card}>
        <Text style={styles.title}>Admin Registration</Text>
        <Text style={styles.subtitle}>Welcome to FoodStall !</Text>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={AdminRegistrationValidationSchema}
          onSubmit={handleRegister}
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
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Register</Text>
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
          onPress={() => navigation.navigate("admin-login")}
        >
          <Text style={styles.signupText}>Login Instead?</Text>
        </TouchableOpacity>
      </View>
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
  error: {
    color: "red",
    marginBottom: 5,
  },
  card: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
