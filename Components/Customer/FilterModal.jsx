import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FilterModal = ({
  modalVisible,
  setModalVisible,
  categories,
  setSelectedCategory,
  applyFilter,
}) => {
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
          <View className="flex-row align-middle justify-around border-b-0.5 p-2">
            <Text className="text-center font-bold flex-1 text-[#1d543a] text-xl ml-6">
              Filter
            </Text>
            <Pressable
              style={{
                alignSelf: "center",
              }}
              onPress={() => {
                setModalVisible((prev) => !prev);
              }}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </Pressable>
          </View>
          {categories ? (
            categories.map((item) => {
              return (
                <TouchableOpacity
                  className="p-2 border-b-0.5"
                  onPress={() => {
                    setSelectedCategory(item.id);
                    applyFilter(item.id);
                    setModalVisible((prev) => !prev);
                  }}
                >
                  <Text
                    className={`self-center text-base font-semibold text-black `}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <></>
          )}
          <TouchableOpacity
            className="p-2 border-b-0.5"
            onPress={() => {
              applyFilter(-1);
              setModalVisible((prev) => !prev);
            }}
          >
            <Text className={`self-center text-base font-semibold text-black `}>
              All
            </Text>
          </TouchableOpacity>
          {/* <FlatList
            data={categories}
            renderItem={(itemData) => {
              return (
                
              );
            }}
          /> */}
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
