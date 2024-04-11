import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import GlobalContext from "../../Context/GlobalContext";
import StallCard from "../../Components/Customer/StallCard";
import MenuCard from "../../Components/Custom/MenuCard";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CartCard from "../../Components/Customer/CartCard";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import Tags from "../../Components/Customer/Tags";

const CustomerStallMenu = ({ route }) => {
  //   const { data, id } = route.params;
  const { stall, categoryId } = route.params;
  const [vendorCategories, setVendorCategories] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [activeTags, setActiveTags] = useState([]);
  //   const [menu, setmenu] = useState(data);
  //   const [displayedStalls, setDisplayedStalls] = useState(data);
  function renderItem(itemData) {
    return <MenuCard item={itemData.item} role="customer" />;
  }
  const { cart } = useContext(GlobalContext);
  const tags = [
    { name: "Regular", id: 1, value: "Regular" },
    { name: "Swaminarayan", id: 2, value: "Swaminarayan" },
    { name: "Jain", id: 3, value: "Jain" },
    { name: "Spicy", id: 4, value: "Spicy" },
    { name: "Medium", id: 5, value: "Medium" },
    { name: "Light", id: 6, value: "Light" },
    { name: "Best Seller", id: 7, value: "Best Seller" },
    { name: "Kids", id: 8, value: "Kids" },
    { name: "Starter", id: 9, value: "Starter" },
    { name: "Yummy", id: 10, value: "Yummy" },
    { name: "Healthy", id: 11, value: "Healthy" },
  ];

  const [menu, setMenu] = useState([]);
  const [displayedMenu, setDisplayedMenu] = useState([]);

  const filterMenu = (categoryId) => {
    if (categoryId === "-1") {
      setDisplayedMenu(menu);
      return;
    }
    axios
      .get(
        `/api/v1/customer/food_items?vendor_id=${stall.id}&category_id=${categoryId}`
      )
      .then((res) => {
        setDisplayedMenu(res.data.food_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getVendorCategories = (menu) => {
    const uniqueCategories = [
      ...new Set(
        menu.map((item) => JSON.stringify(item.vendor_category.category))
      ),
    ].map((category) => JSON.parse(category));

    setVendorCategories(uniqueCategories);
    console.log("abxcd", vendorCategories);
  };
  const fetchMenu = async () => {
    try {
      axios
        .get(`/api/v1/customer/food_items?vendor_id=${stall.id}`)
        .then((response) => {
          const res = response.data.food_items || [];
          console.log(res);
          setMenu(res);
          setDisplayedMenu(res);
          getVendorCategories(res);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderTags = (itemData) => {
    return <Tags tag={itemData.item} />;
  };
  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <SafeAreaView className="flex-1 flex-col align-middle justify-between bg-white">
      <LinearGradient
        colors={["#D8F3DC", "#B7E4C7"]}
        className="py-3"
        style={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <NavBar title={stall.stall_name} />
        <View className="flex-row align-middle mx-6 mb-3">
          {vendorCategories?.map((item) => {
            return (
              <View className="border-0.5 p-1 rounded mr-3" key={item.id}>
                <Text className="text-gray-600 mx-0.5 text-base">
                  {item.name}
                </Text>
              </View>
            );
          })}
        </View>
        <View className="flex-row justify-start align-middle mx-6 my-3">
          <MaterialCommunityIcons name="chef-hat" size={20} color="green" />
          <Text className="self-center ml-1 text-green-900 font-semibold">
            {stall.first_name} {stall.last_name}
          </Text>
        </View>
      </LinearGradient>
      <View className="flex-row align-middle justify-center mx-6 my-2">
        {/* <View className="border flex-1 border-gray-300 rounded">
          <Picker
            selectedValue={selectedCategoryId}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue);
              filterMenu(itemValue);
              setSelectedCategoryId(itemValue);
            }}
          >
            <Picker.Item label="All" value="-1" key="0" />
            {vendorCategories?.map((item, index) => (
              <Picker.Item label={item.name} value={item.id} key={item.id} />
            ))}
          </Picker>
        </View> */}
        <FlatList
          data={tags}
          renderItem={renderTags}
          keyExtractor={(item) => item.id}
          className="mt-2"
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>

      {displayedMenu?.length !== 0 ? (
        <FlatList
          data={displayedMenu}
          renderItem={renderItem}
          numColumns={2}
          className="mx-2 flex-1"
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Menu Found</Text>
        </View>
      )}
      {cart?.cart_items?.length !== 0 && <CartCard />}
    </SafeAreaView>
  );
};

export default CustomerStallMenu;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
