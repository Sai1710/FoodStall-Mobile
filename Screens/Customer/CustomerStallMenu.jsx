import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import GlobalContext from "../../Context/GlobalContext";
import StallCard from "../../Components/Customer/StallCard";
import MenuCard from "../../Components/Custom/MenuCard";
import axios from "axios";
import CartCard from "../../Components/Customer/CartCard";
import { Picker } from "@react-native-picker/picker";

const CustomerStallMenu = ({ route }) => {
  //   const { data, id } = route.params;
  const { stall, categoryId } = route.params;
  const [vendorCategories, setVendorCategories] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  //   const [menu, setmenu] = useState(data);
  //   const [displayedStalls, setDisplayedStalls] = useState(data);
  function renderItem(itemData) {
    return <MenuCard item={itemData.item} role="customer" />;
  }
  const { cart } = useContext(GlobalContext);

  const [menu, setMenu] = useState([]);
  const [displayedMenu, setDisplayedMenu] = useState([]);

  const tempMenu = [
    { name: "Vegetable Soup", item_type: "veg", price: 5.99 },
    { name: "Chicken Sandwich", item_type: "non_veg", price: 8.99 },
    { name: "Salad Bowl", item_type: "veg", price: 6.49 },
    { name: "Beef Burger", item_type: "non_veg", price: 9.49 },
    { name: "Fruit Salad", item_type: "veg", price: 4.99 },
    { name: "Fish Tacos", item_type: "non_veg", price: 7.99 },
  ];

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

  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="FoodStall" />
      <View className="flex-row align-middle justify-center mx-6 my-2">
        <Text className="flex-1 font-bold text-xl text-[#047857] self-center">
          {stall.stall_name}
        </Text>
        <View className="border flex-1 border-gray-300 rounded">
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
        </View>
      </View>

      {displayedMenu?.length !== 0 ? (
        <FlatList
          data={displayedMenu}
          renderItem={renderItem}
          numColumns={2}
          className="m-2"
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
