import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DEFAULT_URL from "../config";
import axios from "axios";

const DeleteModal = ({ modalVisible, setModalVisible, data, fetchData }) => {
  console.log(data);
  const handleDelete = async (id) => {
    const token = await AsyncStorage.getItem("access-token");
    try {
      axios
        .delete(`${DEFAULT_URL}/api/v1/admin/categories/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "ngrok-skip-browser-warning": true,
          },
        })
        .then((res) => {
          fetchData();
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          className="flex-1
            justify-center
            items-center opacity-75"
        >
          <View className="bg-gray-100 rounded-lg p-8 m-4 w-3/4">
            <View className="m-2">
              <Text className="font-bold text-xl">
                Are you sure you want to delete?
              </Text>
            </View>
            <View>
              <View className="flex-row align-middle justify-center">
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  className="bg-white p-4 rounded flex-1 m-1"
                >
                  <Text className="text-center text-red-900 font-bold">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    handleDelete(data.id);
                  }}
                  className="bg-red-900 p-4 rounded flex-1 m-1"
                >
                  <Text className="text-center text-white font-bold">
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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

export default DeleteModal;
