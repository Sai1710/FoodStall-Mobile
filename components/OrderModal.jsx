import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DEFAULT_URL from "../config";
import axios from "axios";

const OrderModal = ({ modalVisible, setModalVisible, data }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            padding: 16,
            margin: 16,
            width: "75%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "rgb(20,83,45)",
              marginBottom: 8,
            }}
          >
            {data.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 8,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "rgb(20,83,45)" }}>
              Item Type:
            </Text>
            <Text style={{ fontWeight: "bold" }}>{data.item_type}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 8,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "rgb(20,83,45)" }}>
              Subtype:
            </Text>
            <View>
              {data.sub_type.map((item) => (
                <Text key={item} style={{ marginRight: 4, fontWeight: "bold" }}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 8,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "rgb(20,83,45)" }}>
              Tags:
            </Text>
            <View>
              {data.tags.map((item) => (
                <Text key={item} style={{ marginRight: 4, fontWeight: "bold" }}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 8,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "rgb(20,83,45)" }}>
              Price:
            </Text>
            <Text style={{ fontWeight: "bold" }}>{data.price}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("edit-item", { data: data });
              }}
              style={{
                backgroundColor: "blue",
                padding: 12,
                borderRadius: 8,
                margin: 8,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Edit
              </Text>
            </Pressable>
            <Pressable
              onPress={handleDelete}
              style={{
                backgroundColor: "red",
                padding: 12,
                borderRadius: 8,
                margin: 8,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
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

export default OrderModal;
