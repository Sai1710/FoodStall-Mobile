import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DEFAULT_URL from "../config";
import Container, { Toast } from "toastify-react-native";

import axios from "axios";

const CategoryModal = ({ addModalVisible, setAddModalVisible, fetchData }) => {
  const [category, setCategory] = useState("");

  const handleCategory = async () => {
    const token = await AsyncStorage.getItem("access-token");

    axios
      .post(
        `${DEFAULT_URL}/api/v1/admin/categories`,
        {
          category: {
            name: category,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "ngrok-skip-browser-warning": true,
          },
        }
      )
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          setAddModalVisible(!addModalVisible);
          fetchData();
          Toast.success("Category created successfully");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Container position="top" />

      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => {
            setAddModalVisible(!addModalVisible);
          }}
        >
          <View
            className="flex-1
            justify-center
            items-center bg-black opacity-75"
          >
            <View className="bg-gray-100 rounded-lg p-8 m-4 w-3/4">
              <View className="m-2">
                <TextInput
                  className="border-gray-300 p-3 mb-4 rounded-lg"
                  style={{ borderWidth: 1 }}
                  placeholder="New Category"
                  onChangeText={setCategory}
                  value={category}
                />
              </View>
              <View>
                <View className="flex-row align-middle justify-center">
                  <Pressable
                    onPress={() => {
                      setAddModalVisible(!addModalVisible);
                    }}
                    className="bg-white p-4 rounded flex-1 m-1"
                  >
                    <Text className="text-center text-red-900 font-bold">
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={handleCategory}
                    className="bg-green-900 p-4 rounded flex-1 m-1"
                  >
                    <Text className="text-center text-white font-bold">
                      Add
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default CategoryModal;
