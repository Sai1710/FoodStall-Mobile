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
    setAddModalVisible(false);

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
    setCategory("");
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
            setAddModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="New Category"
                  onChangeText={setCategory}
                  value={category}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setAddModalVisible(false);
                    setCategory("");
                  }}
                >
                  <Text style={{ color: "darkred", fontWeight: "bold" }}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.addButton]}
                  onPress={handleCategory}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </Pressable>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContent: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 20,
    width: "75%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#fff",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#14532D",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CategoryModal;
