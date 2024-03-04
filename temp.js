import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useState, useEffect } from "react";
import MultiSelect from "react-native-multiple-select";
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
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [stallName, setStallName] = useState("");
  const [stallLogo, setStallLogo] = useState();

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
    console.log(
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      stallName,
      stallLogo,
      categories,
      franchise,
      franchiseDetails
    );
    // if (confirmPassword == password) {
    //   axios
    //     .post(
    //       `${DEFAULT_URL}/api/v1/vendor/sign_up`,

    //       {
    //         vendor: {
    //           first_name: firstName,
    //           last_name: lastName,
    //           email: email,
    //           phone_number: phoneNumber,
    //           password: password,
    //           confirm_password: confirmPassword,
    //           type_of_categories: categories,
    //           franchise: franchise,
    //           stall_name: stallName,
    //           stall_logo: stallLogo,
    //           franchise_details: franchiseDetails,
    //         },
    //         client_id: "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI",
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       navigation.navigate("vendor-login");
    //     })
    //     .catch((err) => {
    //       console.error("Error in Axios request:", err.message);
    //     });
    // } else {
    //   alert("Password dont match");
    // }
    // setFirstName("");
    // setLastName("");
    // setEmail("");
    // setPhoneNumber("");
    // setCategories([]);
    // setPassword("");
    // setConfirmPassword("");
    // setFranchise(false);
    // setFranchiseDetails("");
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setStallLogo(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }  
  };

  const onSelectedItemsChange = (categories) => {
    setCategories(categories);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor={"#fff"}></StatusBar>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Register your Stall</Text>
            <Text style={styles.subtitle}>Enter stall details</Text>
            <View style={styles.inputContainer}>
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

              <TextInput
                className="border-gray-300 p-3 mb-4 rounded-lg"
                style={{ borderWidth: 1 }}
                onChangeText={setStallName}
                value={stallName}
                placeholder="Stall Name"
              />
                          </View>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={pickImageAsync}
            >
              <Text style={styles.uploadButtonText}>
                {!stallLogo ? "Upload Stall Logo" : "Image Selected"}
              </Text>
            </TouchableOpacity>
            <MultiSelect
                items={fetchedCategories}
                uniqueKey="name"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={categories}
                selectText="Categories"
                tagRemoveIconColor="#4caf50"
                tagBorderColor="#4caf50"
                tagTextColor="#4caf50"
                selectedItemTextColor="green"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#4caf50"
                submitButtonText="Submit"
                styleMainWrapper={{
                  borderWidth: 1,
                  // padding: 2,
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
              )}            <TouchableOpacity style={styles.registerButton} onPress={onSubmit}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            {/* Other components */}
          </View>
          <View
              className="flex-row mt-3"
              style={{ alignItems: "center", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("vendor-login");
                }}
              >
                <Text className="text-green-900 text-center items-center font-bold">
                  Login Instead?
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#0F4C75",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#0F4C75",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#0F4C75",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#0F4C75",
    paddingVertical: 15,
    borderRadius: 5,
  },
  registerButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
