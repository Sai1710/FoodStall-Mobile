import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DEFAULT_URL from "../config";
import axios from "axios";

const RequestModal = ({
  modalVisible,
  setModalVisible,
  data,
  fetchRequests,
}) => {
  const handleApprove = async (requestId) => {
    const token = await AsyncStorage.getItem("access-token");

    try {
      axios
        .post(
          `${DEFAULT_URL}/api/v1/admin/approve_request/${requestId}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log("Request approved successfully:", res.data);
          fetchRequests();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (requestId) => {
    const token = await AsyncStorage.getItem("access-token");

    try {
      axios
        .post(
          `${DEFAULT_URL}/api/v1/admin/reject_request/${requestId}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log("Request rejected successfully:", res.data);
          fetchRequests();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error rejecting request:", error);
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
        <Pressable
          className="flex-1
            justify-center
            items-center
            bg-black
            opacity-75
          "
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View className="bg-white rounded-lg p-8 m-4 w-3/4">
            <View>
              <Text
                className="text-center text-2xl font-bold mb-4"
                style={{ color: "rgb(20,83,45)" }}
              >
                Stall Request
              </Text>
            </View>
            <View className="flex-row align-middle justify-between m-2">
              <Text className="font-bold" style={{ color: "rgb(20,83,45)" }}>
                Email:
              </Text>
              <Text className="font-bold">{data.email}</Text>
            </View>
            <View className="flex-row align-middle justify-between m-2">
              <Text className="font-bold" style={{ color: "rgb(20,83,45)" }}>
                Name:
              </Text>
              <Text className="font-bold">
                {data.first_name + " "}
                {data.last_name}
              </Text>
            </View>
            <View className="flex-row align-middle justify-between m-2">
              <Text className="font-bold" style={{ color: "rgb(20,83,45)" }}>
                Phone:
              </Text>
              <Text className="font-bold">{data.phone_number}</Text>
            </View>
            <View className="flex-row align-middle justify-between m-2">
              <Text className="font-bold" style={{ color: "rgb(20,83,45)" }}>
                Status:
              </Text>
              <Text className="font-bold">{data.status}</Text>
            </View>
            <View className="flex-row align-middle justify-between m-2">
              <Text className="font-bold" style={{ color: "rgb(20,83,45)" }}>
                Franchise:
              </Text>
              <Text className="font-bold">
                {data.franchise ? "True" : "False"}
              </Text>
            </View>
            {data.franchise && (
              <View className="flex align-middle justify-between m-2">
                <Text className="font-bold" style={{ color: "rgb(20,83,45)" }}>
                  Franchise Details:
                </Text>
                <Text className="font-bold">{data.franchise_details}</Text>
              </View>
            )}
            <View className="flex align-middle justify-between m-2">
              <Text className="font-bold" style={{ color: "rgb(20,83,45)" }}>
                Categories:
              </Text>
              <View className="flex-row">
                {data.type_of_categories.map((item) => {
                  return (
                    <Text key={item} className="mr-1 font-bold">
                      {item}
                    </Text>
                  );
                })}
              </View>
            </View>

            <View>
              {data.status == "pending" ? (
                <View className="flex-row align-middle justify-center">
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      handleApprove(data.id);
                    }}
                    className="bg-green-900 p-4 rounded flex-1 m-1"
                  >
                    <Text className="text-center text-white font-bold">
                      Accept
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      handleReject(data.id);
                    }}
                    className="bg-red-900 p-4 rounded flex-1 m-1"
                  >
                    <Text className="text-center text-white font-bold">
                      Reject
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  className="bg-red-900 p-4 rounded flex-1 m-1"
                >
                  <Text className="text-center text-white font-bold">
                    Close
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </Pressable>
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

export default RequestModal;
