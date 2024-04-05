import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const CustomModal = ({
  visible,
  title,
  buttonTitle,
  buttonColor,
  setVisible,
  onButtonClick,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible((prev) => !prev);
      }}
    >
      <View
        className={`flex-1 justify-center items-center bg-black`}
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <View className={`bg-white rounded-lg p-6 w-80`}>
          <Text className={`text-lg font-bold mb-4`}>{title}</Text>
          <TouchableOpacity
            className={`bg-${buttonColor} rounded-lg py-2 px-4 items-center`}
            onPress={onButtonClick}
          >
            <Text className={`text-white font-bold`}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
