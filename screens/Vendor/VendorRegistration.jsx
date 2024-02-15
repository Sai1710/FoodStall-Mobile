import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import axios from "axios";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import { CATEGORIES } from "../../data/dummy-data";
import MultiSelect from "react-native-multiple-select";
// import * as ImagePicker from "expo-image-picker";

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
    if (confirmPassword == password) {
      axios
        .post(
          "https://b622-2401-4900-1f3e-1590-ed04-e2c0-9ce9-45e9.ngrok-free.app/api/v1/vendor/sign_up",

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

  const items = [
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
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View className="p-3">
        <Text className="font-extrabold text-2xl">Register your Stall</Text>
      </View>
      <View>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          placeholder="First Name"
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="numeric"
          placeholder="Phone Number"
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

        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={categories}
          selectText="Categories"
          searchInputPlaceholderText="Search"
          submitButtonColor="#4caf50"
          submitButtonText="Submit"
        />
        <View className="flex-row align-middle justify-center">
          <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={(isChecked) => {
              setFranchise((prev) => !prev);
            }}
          />
          <Text>Franchise</Text>
        </View>
        {franchise && (
          <TextInput
            style={styles.input}
            onChangeText={setFranchiseDetails}
            value={franchiseDetails}
            placeholder="Franchise Details"
          />
        )}

        {/* <View>
              <Button
                theme="primary"
                label="Choose a photo"
                title="Choose Photo"
                onPress={pickImageAsync}
              />
              <Image
                source={{ uri: selectedImage }}
                style={{ height: 60, width: 60 }}
              />
            </View> */}
        <View>
          <Pressable
            style={{
              backgroundColor: "#4caf50",
              alignItems: "center",
              padding: 10,
            }}
            onPress={onSubmit}
          >
            <Text style={{ color: "white" }}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
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
