import React from "react";
import { View, Text, Button, Modal, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DEFAULT_URL from "../config";
import axios from "axios";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const DeleteModal = ({ modalVisible, setModalVisible, data, fetchData }) => {
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
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Category Deleted",
            button: "Close",
          });
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                  Are you sure you want to delete ?
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={[styles.button, styles.cancelButton]}
                >
                  <Text style={{ fontWeight: "bold", color: "darkred" }}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    handleDelete(data);
                  }}
                  style={[styles.button, styles.deleteButton]}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
  messageContainer: {
    marginBottom: 20,
  },
  messageText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#fff",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DeleteModal;
