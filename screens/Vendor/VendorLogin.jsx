import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

export default function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    if (email && password) {
      console.log(email);
      console.log(password);
    } else {
      alert("Some fields are left");
    }
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <View>
        <Text>Welcome Back</Text>
        <Text>Enter your credentials to access your account</Text>
      </View>
      <View>
        <Text>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter your Email"
          onChangeText={setEmail}
        />
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          style={{
            backgroundColor: "#4caf50",
            alignItems: "center",
            padding: 10,
          }}
          onPress={onSubmit}
        >
          <Text style={{ color: "white" }}>Login</Text>
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
