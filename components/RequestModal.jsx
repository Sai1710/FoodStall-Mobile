import React, { useState } from "react";
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
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Vendor Approved",
            button: "Close",
          });
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
          style={styles.modalOverlay}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.modalTitle}>Stall Request</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{data.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>
                {data.first_name + " " + data.last_name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>{data.phone_number}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <Text style={styles.infoValue}>{data.status}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Franchise:</Text>
              <Text style={styles.infoValue}>
                {data.franchise ? "True" : "False"}
              </Text>
            </View>
            {data.franchise && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Franchise Details:</Text>
                <Text style={styles.infoValue}>{data.franchise_details}</Text>
              </View>
            )}
            <View style={(styles.infoRow, { flexDirection: "column" })}>
              <Text style={styles.infoLabel}>Categories:</Text>
              <View style={styles.categoriesContainer}>
                {data.type_of_categories.map((item) => {
                  return (
                    <Text key={item} style={styles.categoryItem}>
                      {item}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View>
              {data.status == "pending" ? (
                <View style={styles.buttonContainer}>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      handleApprove(data.id);
                    }}
                    style={[styles.actionButton, styles.acceptButton]}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      handleReject(data.id);
                    }}
                    style={[styles.actionButton, styles.rejectButton]}
                  >
                    <Text style={styles.buttonText}>Reject</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  style={[styles.actionButton, styles.closeButton]}
                >
                  <Text style={styles.buttonText}>Close</Text>
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
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    width: "90%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#14532d",
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#14532d",
  },
  infoValue: {
    fontWeight: "bold",
  },
  categoriesContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  categoryItem: {
    marginRight: 5,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  acceptButton: {
    backgroundColor: "#047857",
  },
  rejectButton: {
    backgroundColor: "#FF0000",
  },
  closeButton: {
    backgroundColor: "#FF0000",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RequestModal;
