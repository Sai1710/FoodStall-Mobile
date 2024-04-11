import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FilterModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible((prev) => !prev);
      }}
    >
      <View
        className="flex-1 justify-end"
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <View className="bg-white rounded-lg mx-3" style={{ marginBottom: 60 }}>
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-lg p-3 border-b border-gray-300">
              Option 1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-lg p-3 border-b border-gray-300">
              Option 2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible((prev) => !prev)}
            className="bg-white flex-row items-center justify-center p-3 border-t border-gray-300 rounded-b-lg"
            style={{ opacity: 0.9 }}
          >
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
