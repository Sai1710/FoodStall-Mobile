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
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useState, useEffect } from "react";
import MultiSelect from "react-native-multiple-select";
import ModalDropdown from "react-native-modal-dropdown";
import DEFAULT_URL from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditItem({ route, navigation }) {
  const { data } = route.params;
  console.log(data.price.toString());
  const [name, setName] = useState(data.name);
  const [itemType, setItemType] = useState(data.item_type);
  const [subType, setSubType] = useState(data.sub_type);
  const [taste, setTaste] = useState(data.taste);
  const [tags, setTags] = useState(data.tags);
  const [price, setPrice] = useState(data.price.toString());
  const [foodCategory, setFoodCategory] = useState("1");

  const itemTypeOptions = [
    { name: "Veg", value: "veg" },
    { name: "Non-Veg", value: "no-veg" },
  ];

  const itemSubTypeOptions = [
    { name: "Regular", value: "regular" },
    { name: "Swaminarayan", value: "swaminarayan" },
    { name: "Jain", value: "jain" },
  ];

  const tasteOptions = [
    { name: "Spicy", value: "spicy" },
    { name: "Medium", value: "medium" },
    { name: "Light", value: "light" },
  ];

  const tagOptions = [
    { name: "Best Seller", value: "best_seller" },
    { name: "Kids", value: "kids" },
    { name: "Starter", value: "starter" },
    { name: "Yummy", value: "yummy" },
    { name: "Healthy", value: "healthy" },
  ];

  const categoryOptions = [
    { name: "punjabi", id: 1 },
    {
      name: "chinese",
      id: 2,
    },
  ];

  onSelectedItemSubTypes = (items) => {
    setSubType(items);
  };
  onSelectedTastes = (items) => {
    setTaste(items);
  };
  onSelectedTags = (items) => {
    setTags(items);
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const token = await AsyncStorage.getItem("access-token");
    const categoryId = Number(foodCategory);
    console.log(name, itemType, subType, taste, tags, price, foodCategory);

    const editedData = {
      name: name,
      item_type: itemType,
      sub_type: subType,
      taste: taste,
      tags: tags,
      price: price,
      food_category: categoryId,
    };
    e.preventDefault();
    try {
      await axios.put(
        `${DEFAULT_URL}/api/v1/vendor/food_items/${data.id}`,
        editedData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      navigation.navigate("vendor-menu");
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };
  return (
    <ScrollView>
      <StatusBar backgroundColor={"#fff"}></StatusBar>
      <View className="flex-1 justify-center items-center">
        <View
          className="w-4/5 bg-white p-5 rounded-lg shadow-md"
          style={{ margin: 80 }}
        >
          <Text className="text-2xl font-bold text-center mb-5">
            Edit Your Item
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="border-gray-300 p-3 mb-4 rounded-lg"
            style={{ borderWidth: 1 }}
            placeholder="Item Name"
          />
          <TextInput
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            className="border-gray-300 p-3 mb-4 rounded-lg"
            style={{ borderWidth: 1 }}
            placeholder="Price"
          />
          <View
            style={{
              borderWidth: 1,
              padding: 2,
              borderColor: "rgb(203,213,219)",
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <Picker
              selectedValue={itemType}
              onValueChange={(itemValue, itemIndex) => {
                setItemType(itemValue);
                console.log(itemType);
              }}
            >
              {itemTypeOptions.map((item) => {
                return (
                  <Picker.Item
                    key={item.name}
                    label={item.name}
                    value={item.value}
                  />
                );
              })}
            </Picker>
          </View>
          <MultiSelect
            items={itemSubTypeOptions}
            uniqueKey="value"
            onSelectedItemsChange={onSelectedItemSubTypes}
            selectedItems={subType}
            selectText="Item SubTypes"
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
          <MultiSelect
            items={tasteOptions}
            uniqueKey="value"
            onSelectedItemsChange={onSelectedTastes}
            selectedItems={taste}
            selectText="Taste Options"
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
          <MultiSelect
            items={tagOptions}
            uniqueKey="value"
            onSelectedItemsChange={onSelectedTags}
            selectedItems={tags}
            selectText="Tags"
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
          <View
            style={{
              borderWidth: 1,
              padding: 2,
              borderColor: "rgb(203,213,219)",
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <Picker
              selectedValue={foodCategory}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue);
                setFoodCategory(itemValue);
              }}
            >
              {categoryOptions.map((item) => {
                return (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  />
                );
              })}
            </Picker>
          </View>

          <TouchableOpacity
            className="bg-green-900 py-3 rounded-lg"
            onPress={handleEditFormSubmit}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Submit
            </Text>
          </TouchableOpacity>
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
});
