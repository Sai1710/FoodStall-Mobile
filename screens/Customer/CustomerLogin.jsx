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

export default function CustomerLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setAccessToken = async (res) => {
    await AsyncStorage.setItem("access-token", res.data.customer.access_token);
  };

  const handleLogin = async () => {
    try {
      axios
        .post(`${DEFAULT_URL}/api/v1/customer/login`, {
          customer: {
            email: email,
            password: password,
          },
          client_id: "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI",
        })
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            navigation.navigate("home-screen");
            setAccessToken(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#FFFFFF"} />
      <View style={styles.card}>
        <Text style={styles.title}>Customer Login</Text>
        <Text style={styles.subtitle}>What are you craving today?</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
          onPress={() => navigation.navigate("customer-registration")}
        >
          <Text style={styles.signupText}>Sign Up Instead?</Text>
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
