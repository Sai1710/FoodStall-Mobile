// import SelectBox from "react-native-multi-selectbox";

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
import axios from "axios";
import { xorBy } from "lodash";
import { CheckBox } from "react-native-btr";
import { useState } from "react";
import { CATEGORIES } from "../../data/dummy-data";
import MultiSelect from "react-native-multiple-select";
// import * as ImagePicker from "expo-image-picker";
import ModalDropdown from "react-native-modal-dropdown";
export default function VendorRegistration() {
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
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = async () => {
    console.log(
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      categories,
      franchise,
      franchiseDetails,
      confirmPassword
    );
    if (confirmPassword == password) {
      axios
        .post(
          `${DEFAULT_URL}/api/v1/vendor/sign_up`,

          {
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
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error("Error in Axios request:", err.message);
        });
    } else {
      alert("Password dont match");
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setCategories([]);
    setPassword("");
    setConfirmPassword("");
    setFranchise(false);
    setFranchiseDetails("");
    setSelectedImage(null);
  };
  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setSelectedImage(result.assets[0].uri);
  //   } else {
  //     alert("You did not select any image.");
  //   }
  // };

  onSelectedItemsChange = (categories) => {
    setCategories(categories);
  };

  const fetchedCategories = [
    {
      id: "c1",
      name: "Chinese",
    },
    {
      id: "c2",
      name: "Burgers",
    },
    {
      id: "c3",
      name: "South Indian",
    },
    {
      id: "c4",
      name: "Punjabi",
    },
    {
      id: "c5",
      name: "Mexican",
    },
    {
      id: "c6",
      name: "Breakfast",
    },
    {
      id: "c7",
      name: "French",
    },
  ];
  return (
    <ScrollView>
      <StatusBar backgroundColor={"#fff"}></StatusBar>
      <View className="flex-1 justify-center items-center">
        {/* <ImageBackground
          source={require("../../assets/VendorLoginBack.png")}
          style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            alignItems: "center",
            width: 450,
          }}
          blurRadius={5}
        > */}
        <View
          className="w-4/5 bg-white p-5 rounded-lg shadow-md"
          style={{ margin: 80 }}
        >
          <Text className="text-2xl font-bold text-center mb-5">
            Register your Stall
          </Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            className="border-gray-300 p-3 mb-4 rounded-lg"
            style={{ borderWidth: 1 }}
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

          {/* <SelectBox
              label="Categories"
              options={items}
              selectedValues={categories}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              isMulti
            /> */}
          <MultiSelect
            items={fetchedCategories}
            uniqueKey="id"
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
          <TouchableOpacity
            className="bg-green-900 py-3 rounded-lg"
            onPress={onSubmit}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Register
            </Text>
          </TouchableOpacity>
          <Pressable className="mt-10 mb-4">
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#14532d",
                fontSize: 19,
              }}
            >
              Login Instead?
            </Text>
          </Pressable>
        </View>
        {/* </ImageBackground> */}
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
});
