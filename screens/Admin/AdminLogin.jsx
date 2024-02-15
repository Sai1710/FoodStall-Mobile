import { useState } from "react";
import { TextInput, Text, StyleSheet, View, Pressable } from "react-native";

export default function AdminLogin() {
  const [mobile, setMobile] = useState();
  const [OTP, setOTP] = useState();

  function onSubmit() {
    if (mobile && OTP) {
      console.log(mobile, OTP);
    } else {
      alert("Invalid Credentials");
    }
    setMobile();
    setOTP();
  }

  return (
    <>
      <Text>Admin Login</Text>
      <View>
        <Text>Phone Number</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
        />
        <Text>OTP</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={OTP}
          onChangeText={setOTP}
        />
        <Pressable
          style={{
            backgroundColor: "#4caf50",
            alignItems: "center",
            padding: 10,
          }}
          onPress={onSubmit}
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
