import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import axios from "axios";
import { useState } from "react";
export default function AdminRegistration({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (confirmPassword == password) {
      console.log(email, password);
      try {
        axios
          .post(
            "https://b622-2401-4900-1f3e-1590-ed04-e2c0-9ce9-45e9.ngrok-free.app/api/v1/admin/sign_up",
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
    <>
      <View>
        <Text>Admin SignUp</Text>
      </View>
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
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
        />

        <Pressable
          onPress={handleSubmit}
          style={{
            backgroundColor: "#4caf50",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "white" }}>SignUp</Text>
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
