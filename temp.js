import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import axios from "axios";
import { MultiSelect } from "react-native-multiple-select";
import DEFAULT_URL from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VendorRegistration({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [categories, setCategories] = useState([]);
  const [franchise, setFranchise] = useState(false);
  const [franchiseDetails, setFranchiseDetails] = useState("");
  const [error, setError] = useState("");
  const [fetchedCategories, setFetchedCategories] = useState([]);

  const fetchCategories = async () => {
    const token = await AsyncStorage.getItem("access-token");
    try {
      axios.get(`${DEFAULT_URL}/api/v1/admin/categories`).then((response) => {
        const categories = response.data.categories || [];
        setFetchedCategories(categories);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async () => {
    if (confirmPassword == password) {
      axios
        .post(`${DEFAULT_URL}/api/v1/vendor/sign_up`, {
          vendor: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
            password: password,
            confirm_password: confirmPassword,
            type_of_categories: categories,
            franchise: franchise,
            franchise_details: franchiseDetails,
          },
          client_id: "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI",
        })
        .then((res) => {
          console.log(res);
          navigation.navigate("vendor-login");
        })
        .catch((err) => {
          console.error("Error in Axios request:", err.message);
        });
    } else {
      alert("Password don't match");
    }
    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setCategories([]);
    setPassword("");
    setConfirmPassword("");
    setFranchise(false);
    setFranchiseDetails("");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#fff"} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register your Stall</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          placeholder="First Name"
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={{ borderWidth: 1 }}
          className="border-gray-300 p-3 mb-4 rounded-lg"
          placeholder="Last Name"
        />
        <TextInput
          className="border-gray-300 p-3 mb-4 rounded-lg"
          style={{ borderWidth: 1 }}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          className="border-gray-300 p-3 mb-4 rounded-lg"
          style={{ borderWidth: 1 }}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="numeric"
          placeholder="Phone Number"
        />
        <TextInput
          secureTextEntry={true}
          className="border-gray-300 p-3 mb-4 rounded-lg"
          style={{ borderWidth: 1 }}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
        <TextInput
          secureTextEntry={true}
          className="border-gray-300 p-3 mb-4 rounded-lg"
          style={{ borderWidth: 1 }}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
        />
        <MultiSelect
          items={fetchedCategories}
          uniqueKey="name"
          onSelectedItemsChange={setCategories}
          selectedItems={categories}
          selectText="Categories"
          searchInputPlaceholderText="Search"
          tagRemoveIconColor="#4caf50"
          tagBorderColor="#4caf50"
          tagTextColor="#4caf50"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#4caf50"
          submitButtonText="Submit"
          styleMainWrapper={{
            borderWidth: 1,
            padding: 2,
            borderColor: "rgb(203,213,219)",
            borderRadius: 8,
            marginBottom: 16,
          }}
        />

        <View className="flex-row mb-4">
          <Pressable
            className={` flex-1 pl-2 pr-2
                 pt-2 pb-2 rounded ${
                   franchise ? "bg-green-800" : "bg-gray-500"
                 } text-white font-medium`}
            onPress={() => {
              setFranchise((prev) => !prev);
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Franchise
            </Text>
          </Pressable>
        </View>

        {franchise && (
          <TextInput
            className="border-gray-300 p-3 mb-4 rounded-lg"
            style={{ borderWidth: 1 }}
            onChangeText={setFranchiseDetails}
            value={franchiseDetails}
            placeholder="Franchise Details"
          />
        )}
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("vendor-login")}
        >
          <Text style={styles.loginText}>Login Instead?</Text>
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
  },
  formContainer: {
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 10,
  },
  loginText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#14532d",
    fontSize: 19,
  },
});
