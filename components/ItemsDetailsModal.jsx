import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ItemDetailsModal = ({ modalVisible, setModalVisible, item }) => {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.name}</Text>

            <View
              style={{
                backgroundColor:
                  item.item_type.toUpperCase() === "VEG" ? "green" : "red",
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <Text style={styles.description}>
                {item.item_type.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.divider}></View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Tags</Text>
            <View style={{ flexDirection: "row" }}>
              {item.tags.map((item) => {
                return (
                  <View
                    key={item}
                    style={{
                      backgroundColor: "blue",
                      paddingVertical: 6,
                      paddingHorizontal: 16,
                      borderRadius: 5,
                      marginRight: 10,
                      marginVertical: 10,
                    }}
                  >
                    <Text style={styles.description}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.divider}></View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Taste</Text>
            <View style={{ flexDirection: "row" }}>
              {item.taste.map((item) => {
                return (
                  <View
                    key={item}
                    style={{
                      backgroundColor: "blue",
                      paddingVertical: 6,
                      paddingHorizontal: 16,
                      borderRadius: 5,
                      marginRight: 10,
                      marginVertical: 10,
                    }}
                  >
                    <Text style={styles.description}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.divider}></View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Sub Types</Text>
            <View style={{ flexDirection: "row" }}>
              {item.sub_type.map((item) => {
                return (
                  <View
                    key={item}
                    style={{
                      backgroundColor: "blue",
                      paddingVertical: 6,
                      paddingHorizontal: 16,
                      borderRadius: 5,
                      marginRight: 10,
                      marginVertical: 10,
                    }}
                  >
                    <Text style={styles.description}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible((prev) => !prev);
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    display: "flex",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4caf50",
    margin: "auto",
  },
  closeButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    borderWidth: 1,
    width: "100%",
    margin: 10,
    alignSelf: "center",
  },
});

export default ItemDetailsModal;
