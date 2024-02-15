import { useState } from "react";
import { TextInput, Text, StyleSheet, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function AdminLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      axios
        .post(
          "https://b622-2401-4900-1f3e-1590-ed04-e2c0-9ce9-45e9.ngrok-free.app/api/v1/admin/login",
          {
            admin: {
              email: email,
              password: password,
            },
            client_id: "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI",
          }
        )
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            navigation.navigate("admin-stalls");
            AsyncStorage.setItem("access-token", res.data.admin.access_token);
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
    <>
      <Text>Admin Login</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
        <Pressable
          style={{
            backgroundColor: "#4caf50",
            alignItems: "center",
            padding: 10,
          }}
          onPress={handleLogin}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </Pressable>
      </View>
    </>
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
