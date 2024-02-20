import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import DEFAULT_URL from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteModal from "./DeleteModal";
import CategoryModal from "./CategoryModal";
import { useState } from "react";

export default function AdminCategoryCard({
  modalVisible,
  setModalVisible,
  data,
  fetchData,
  setAddModalVisible,
  addModalVisible,
  setSelectedCategory,
}) {
  return (
    <>
      <View className="flex-row align-middle justify-between my-2 mx-4 bg-white rounded-lg p-3">
        <View style={{ flex: 1 }}>
          <Text
            className="m-auto p-2 font-extrabold"
            style={{ color: "rgb(20,83,45)" }}
          >
            {data.id}
          </Text>
        </View>
        <View style={{ flex: 4 }}>
          <Text
            className="m-auto p-2 font-extrabold"
            style={{ color: "rgb(20,83,45)" }}
          >
            {data.name}
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Pressable
            className="bg-red-600 m-auto rounded-lg p-2"
            onPress={() => {
              setModalVisible((prev) => !prev);
              setSelectedCategory(data.id);
            }}
          >
            <Text className="text-white text-center text-sm font-semibold px-2">
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
