import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import GlobalContext from "../../Context/GlobalContext";
import StallCard from "../../Components/Customer/StallCard";
import MenuCard from "../../Components/Custom/MenuCard";
import axios from "axios";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import CartCard from "../../Components/Customer/CartCard";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import Tags from "../../Components/Customer/CategoryTag";
import SearchBar from "../../Components/Custom/SearchBar";
import FilterModal from "../../Components/Customer/FilterModal";

const CustomerStallMenu = ({ route }) => {
  //   const { data, id } = route.params;
  const { stall, categoryId } = route.params;
  const [vendorCategories, setVendorCategories] = useState();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
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
  const [searchText, setSearchText] = useState();
  const [displayedMenu, setDisplayedMenu] = useState([]);

  const filterMenu = (id) => {
    console.log(id);
    if (id == -1) {
      setDisplayedMenu(menu);
      return;
    } else {
      axios
        .get(
          `/api/v1/customer/food_items?vendor_id=${stall.id}&category_id=${id}`
        )
        .then((res) => {
          setDisplayedMenu(res.data.food_items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const tempMenu = menu.filter((item) => {
      return item.name.includes(text);
    });
    setDisplayedMenu(tempMenu);
  };
  const getVendorCategories = (menu) => {
    const uniqueCategories = [
      ...new Set(
        menu.map((item) => JSON.stringify(item.vendor_category.category))
      ),
    ].map((category) => JSON.parse(category));

    setVendorCategories(uniqueCategories);
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
    filterMenu(categoryId);
  }, []);
  return (
    <SafeAreaView className="flex-1 flex-col align-middle justify-between bg-white">
      <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
        categories={vendorCategories}
        applyFilter={filterMenu}
        setSelectedCategory={setSelectedCategoryId}
      />
      <LinearGradient
        colors={["#B7E4C7", "#96D5B2"]}
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
        <View className="flex-row align-middle justify-center">
          <View className="flex-row w-[78%] items-center border border-gray-300  bg-white rounded-lg p-2 ml-6 mr-3 my-2">
            <Ionicons
              name="search"
              size={24}
              color="#047857"
              className="ml-2"
            />
            <TextInput
              placeholder="Search"
              value={searchText}
              onChangeText={handleSearch}
              className="flex-1 px-2"
            />
          </View>
          <TouchableOpacity
            className="self-center mt-1 flex-1"
            onPress={() => {
              setFilterModalVisible((prev) => !prev);
            }}
          >
            <Image
              source={require("../../assets/Filter.png")}
              className="h-8 w-8"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* <View className="flex-row align-middle justify-center mx-6 my-2">
        <FlatList
          data={tags}
          renderItem={renderTags}
          keyExtractor={(item) => item.id}
          className="mt-2"
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View> */}

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
      {Object.keys(cart).length !== 0 && <CartCard />}
    </SafeAreaView>
  );
};

export default CustomerStallMenu;

const styles = StyleSheet.create({
  // Your custom styles can go here if needed
});
