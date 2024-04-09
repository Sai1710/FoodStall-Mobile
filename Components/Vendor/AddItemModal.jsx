import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useAnimatedValue,
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import { Picker } from "@react-native-picker/picker";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Dialog, ALERT_TYPE } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import GlobalContext from "../../Context/GlobalContext";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const AddItemModal = ({
  modalVisible,
  setModalVisible,
  item,
  mode,
  getMenu,
}) => {
  const [name, setName] = useState(item ? item.name : "");
  const [itemType, setItemType] = useState(item ? item.item_type : "Veg");
  const [subTypes, setSubTypes] = useState(item ? item.sub_type : []);
  const [taste, setTaste] = useState(item ? item.taste : []);
  const [tags, setTags] = useState(item ? item.tags : []);
  const [categoryId, setCategoryId] = useState();
  const [price, setPrice] = useState(item ? item.price.toString() : "");
  const itemSubTypeOptions = [
    { name: "Regular", id: 1, value: "Regular" },
    { name: "Swaminarayan", id: 2, value: "Swaminarayan" },
    { name: "Jain", id: 3, value: "Jain" },
  ];

  const tasteOptions = [
    { name: "Spicy", id: 1, value: "Spicy" },
    { name: "Medium", id: 2, value: "Medium" },
    { name: "Light", id: 3, value: "Light" },
  ];

  const tagOptions = [
    { name: "Best Seller", id: 1, value: "Best Seller" },
    { name: "Kids", id: 2, value: "Kids" },
    { name: "Starter", id: 3, value: "Starter" },
    { name: "Yummy", id: 4, value: "Yummy" },
    { name: "Healthy", id: 5, value: "Healthy" },
  ];

  const itemTypeOptions = [
    { name: "Veg", value: "Veg" },
    { name: "NonVeg", value: "NonVeg" },
  ];
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const tempCategories = await AsyncStorage.getItem("categories");
    setCategories(JSON.parse(tempCategories));
    console.log("categories", JSON.parse(tempCategories));
    setCategoryId(categories[0].id);
  };
  const resetForm = () => {
    setItemType("");
    setPrice("");
    setName("");
    setTags([]);
    setSubTypes([]);
    setTaste([]);
  };

  useEffect(() => {
    getCategories();
  }, []);
  const editItem = () => {
    axios
      .put(`/api/v1/vendor/food_items/${item.id}`, {
        food_item: {
          name: name,
          item_type: itemType,
          sub_type: subTypes,
          taste: taste,
          tags: tags,
          price: price,
        },
      })
      .then((res) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Item Updated",
          button: "Close",
        });
        resetForm();
        getMenu();
        setModalVisible((prev) => !prev);
      });
  };
  const addItem = () => {
    console.log(name, price, subTypes, taste, tags, categoryId, itemType);
    // const formData = new FormData();
    // formData.append("food_item[name]", name);
    // formData.append("food_item[item_type]", itemType);
    // formData.append(`food_item[sub_type]`, JSON.stringify(subTypes));
    // formData.append(`food_item[taste]`, JSON.stringify(taste));
    // formData.append(`food_item[tags]`, JSON.stringify(tags));
    // formData.append("food_item[price]", price);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios
      .post(`/api/v1/vendor/food_items?category_id=${categoryId}`, {
        food_item: {
          name: name,
          item_type: itemType,
          sub_type: subTypes,
          taste: taste,
          tags: tags,
          price: price,
        },
      })
      .then((res) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Item Added",
          button: "Close",
        });
        resetForm();
        getMenu();
        setModalVisible((prev) => !prev);
      });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View
        className={`flex-1 justify-center items-center bg-black bg-opacity-50`}
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View className={`bg-white rounded-lg p-4 w-80`}>
          <View className="flex-row align-middle justify-between p-3">
            <Text className="font-extrabold text-xl text-[#047857]">
              Add Item
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
              }}
              onPress={() => {
                setModalVisible((prev) => !prev);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="">
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Name"
              className={`border border-gray-300 rounded p-2 mx-3 my-2`}
            />
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="Price"
              keyboardType="numeric"
              className={`border border-gray-300 rounded p-2 mx-3 my-2`}
            />
            <View className="border border-gray-300 mx-3">
              <Picker
                selectedValue={itemType}
                onValueChange={(itemValue, itemIndex) => {
                  console.log(itemValue);
                  setItemType(itemValue);
                }}
              >
                {itemTypeOptions.map((item, index) => (
                  <Picker.Item
                    label={item.name}
                    value={item.value}
                    key={index}
                  />
                ))}
              </Picker>
            </View>
            <View className="border border-gray-300 mx-3 mt-3">
              <Picker
                selectedValue={categoryId}
                onValueChange={(itemValue, itemIndex) => {
                  console.log(itemValue);
                  setCategoryId(itemValue);
                }}
              >
                {categories?.map((item, index) => (
                  <Picker.Item label={item.name} value={item.id} key={index} />
                ))}
              </Picker>
            </View>
            <View className="my-2 border border-gray-300 rounded mx-3">
              <MultiSelect
                hideTags
                items={itemSubTypeOptions}
                uniqueKey="value"
                ref={(component) => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={(items) => {
                  setSubTypes(items);
                }}
                selectedItems={subTypes}
                selectText="SubType"
                searchInputPlaceholderText="Search"
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#000"
                tagBorderColor="#000"
                tagTextColor="#000"
                selectedItemTextColor="#000"
                selectedItemIconColor="#000"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#000" }}
                submitButtonColor="#047857"
                submitButtonText="Submit"
              />
            </View>
            <View className="my-2 border border-gray-300 rounded mx-3">
              <MultiSelect
                hideTags
                items={tagOptions}
                uniqueKey="value"
                ref={(component) => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={(items) => {
                  setTags(items);
                }}
                selectedItems={tags}
                selectText="Tags"
                searchInputPlaceholderText="Search"
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#000"
                tagBorderColor="#000"
                tagTextColor="#000"
                selectedItemTextColor="#000"
                selectedItemIconColor="#000"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#000" }}
                submitButtonColor="#047857"
                submitButtonText="Submit"
              />
            </View>
            <View className="my-2 border border-gray-300 rounded mx-3">
              <MultiSelect
                hideTags
                items={tasteOptions}
                uniqueKey="value"
                ref={(component) => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={(items) => {
                  setTaste(items);
                }}
                selectedItems={taste}
                selectText="Taste"
                searchInputPlaceholderText="Search"
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#000"
                tagBorderColor="#000"
                tagTextColor="#000"
                selectedItemTextColor="#000"
                selectedItemIconColor="#000"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#000" }}
                submitButtonColor="#047857"
                submitButtonText="Submit"
              />
            </View>
          </View>

          <View className={`flex-row justify-between`}>
            <TouchableOpacity
              onPress={() => {
                if (mode === "edit") {
                  editItem();
                } else {
                  addItem();
                }
              }}
              className={`bg-[#047857] rounded flex-1 mx-3 py-3 mt-3`}
            >
              <Text className={`text-white font-semibold text-center`}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddItemModal;
