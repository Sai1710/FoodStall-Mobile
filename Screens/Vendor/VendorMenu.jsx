import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import NavBar from "../../Components/Custom/Navbar";
import MenuCard from "../../Components/Custom/MenuCard";
import AddItemModal from "../../Components/Vendor/AddItemModal";

const VendorMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [menu, setMenu] = useState([]);
  function renderItem(itemData) {
    return <MenuCard item={itemData.item} role="vendor" getMenu={getMenu} />;
  }

  const [menu, setMenu] = useState([]);

  const getMenu = () => {
    axios
      .get(`/api/v1/vendor/food_items`)
      .then((res) => {
        setMenu(res.data.food_items);
        console.log(res.data.food_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const tempMenu = [
    { name: "Vegetable Soup", item_type: "veg", price: 5.99 },
    { name: "Chicken Sandwich", item_type: "non_veg", price: 8.99 },
    { name: "Salad Bowl", item_type: "veg", price: 6.49 },
    { name: "Beef Burger", item_type: "non_veg", price: 9.49 },
    { name: "Fruit Salad", item_type: "veg", price: 4.99 },
    { name: "Fish Tacos", item_type: "non_veg", price: 7.99 },
  ];
  useEffect(() => {
    getMenu();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="FoodStall" />
      <AddItemModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        getMenu={getMenu}
      />
      <View className="mx-6 my-2">
        <Text className="font-bold text-xl text-[#047857]">My Menu</Text>
      </View>

      {menu?.length !== 0 ? (
        <FlatList
          data={menu}
          renderItem={renderItem}
          numColumns={2}
          className="m-2"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Menu Found</Text>
        </View>
      )}
      <View className="items-center absolute bottom-10 left-0 right-0 mx-auto">
        <TouchableOpacity
          className="bg-white rounded-full"
          onPress={() => {
            setModalVisible((prev) => !prev);
          }}
        >
          <FontAwesome6 name="circle-plus" size={70} color="#047857" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VendorMenu;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
