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
  VirtualizedList,
  FlatList,
} from "react-native";

import { vendorValidationSchema } from "../../Schemas/ValidationSchema";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { CheckBox } from "react-native-btr";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../../data/dummy-data";
import MultiSelect from "react-native-multiple-select";
import ModalDropdown from "react-native-modal-dropdown";
import DEFAULT_URL from "../../config";
import { Formik } from "formik";
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
  const [formMode, setFormMode] = useState("personal");
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

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("vendor[first_name]", firstName);
    formData.append("vendor[last_name]", lastName);
    formData.append("vendor[email]", email);
    formData.append("vendor[phone_number]", phoneNumber);
    formData.append("vendor[password]", password);
    formData.append("vendor[confirm_password]", confirmPassword);
    formData.append("vendor[type_of_categories]", categories);
    formData.append("vendor[franchise]", franchise);
    formData.append("vendor[franchise_details]", franchiseDetails);
    formData.append("vendor[stall_name]", stallName);
    formData.append("vendor[stall_logo]", {
      stallLogo,
      name: "image.jpg",
      type: "image/jpg",
    });
    formData.append("client_id", "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI");
    console.log(formData);

    axios
      .post(`${DEFAULT_URL}/api/v1/vendor/sign_up`, formData)
      .then((res) => {
        console.log(res);
        navigation.navigate("vendor-login");
      })
      .catch((err) => {
        console.error("Error in Axios request:", err);
      });

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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
             roll permission to upload images.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        setStallLogo(result.assets[0].uri);
        console.log(stallLogo);
      }
    }
  };

  const onSelectedItemsChange = (categories) => {
    setCategories(categories);
  };

  return (
    <ScrollView>
      <View className="flex-1 bg-white align-middle justify-center">
        <StatusBar backgroundColor={"#fff"}></StatusBar>

        <View
          className="flex-1 justify-center"
          style={{ alignItems: "center" }}
        >
          <View
            className="w-4/5 bg-white p-5 rounded-lg shadow-md"
            style={{ margin: 80 }}
          >
            <Text className="text-2xl font-bold text-center mb-5 text-green-900">
              Register your Stall
            </Text>
            <Text className="text-sm font-bold text-center mb-5 text-green-900">
              Enter stall details
            </Text>

            <View className="flex-1">
              <TextInput
                onChangeText={setFirstName}
                value={firstName}
                className="border-gray-300 p-3 mb-4 rounded-lg"
                style={{ borderWidth: 1 }}
                placeholder="First Name"
              />

              <TextInput
                onChangeText={setLastName}
                value={lastName}
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

              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderStyle: "dotted",
                  borderColor: "black",
                  paddingVertical: 5,
                  borderRadius: 8,
                  marginBottom: 12,
                }}
                onPress={pickImageAsync}
              >
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {!stallLogo ? "Upload Stall Logo" : "Image Selected"}
                </Text>
              </TouchableOpacity>

              <MultiSelect
                items={fetchedCategories}
                uniqueKey="name"
                onSelectedItemsChange={onSelectedItemsChange}
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

              <Pressable
                className={`flex-1 m-2 pl-2 pr-2
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

              {franchise && (
                <TextInput
                  className="border-gray-300 p-3 mb-4 rounded-lg"
                  style={{ borderWidth: 1 }}
                  onChangeText={setFranchiseDetails}
                  value={franchiseDetails}
                  placeholder="Franchise Details"
                />
              )}
              <TouchableOpacity
                className="bg-green-900 py-3 rounded-lg"
                onPress={handleRegister}
              >
                <Text className="text-white text-center text-lg font-semibold">
                  Register
                </Text>
              </TouchableOpacity>
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
          {/* </ImageBackground> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});
