import { useEffect, useState } from "react";
import CategoryCard from "../../components/CategoryCard";
import MenuItemCard from "../../components/MenuItemCard";
import { CATEGORIES } from "../../data/dummy-data";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import CustomerNavbar from "../../components/CustomerNavbar";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DEFAULT_URL from "../../config";
import Loading from "../../components/Loading";

function StallMenu({ route }) {
  const { vendor, categoryId } = route.params;
  const [menu, setMenu] = useState([]);
  const [displayedMenu, setDisplayedMenu] = useState([]);
  console.log(vendor.id, categoryId);

  const fetchMenu = async () => {
    const token = await AsyncStorage.getItem("access-token");
    console.log(token);
    try {
      axios
        .get(
          `${DEFAULT_URL}/api/v1/customer/food_items?vendor_id=${vendor.id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              // "ngrok-skip-browser-warning": true,
            },
          }
        )
        .then((response) => {
          const res = response.data.food_items || [];
          console.log(res);
          setMenu(res);
          setDisplayedMenu(res);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (searchText) => {
    const tempMenu = menu.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setDisplayedMenu(tempMenu);
  };
  const renderMenu = (itemData) => {
    return <MenuItemCard key={itemData.id} item={itemData.item} />;
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <View style={{ backgroundColor: "#fff", flex: 1, marginTop: 48 }}>
      <CustomerNavbar
        title={vendor.stall_name ? vendor.stall_name : vendor.first_name}
      />
      <View style={styles.seaarchContainer}>
        <Feather name="search" color="#2F855A" size={20} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(searchText) => {
            handleSearch(searchText);
          }}
        />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Menu</Text>
      </View>

      {/* {menu ? (
            menu.map((item) => {
              return <MenuItemCard key={item.id} item={item} />;
            })
          ) : (
            <Loading />
          )} */}

      <FlatList
        data={displayedMenu}
        keyExtractor={(item) => item.id}
        renderItem={renderMenu}
        numColumns={2}
        style={{ margin: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemsWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 6,
    marginHorizontal: 6,
  },
  singleItem: {
    marginHorizontal: 3,
    width: "50%",
  },
  stallHeading: {
    backgroundColor: "#4caf50",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 40,
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 32,
    color: "white",
    marginLeft: 10,
  },
  headingDesign: {
    backgroundColor: "#4caf50",
    height: 40,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  menuHeading: {
    margin: 30,
  },
  seaarchContainer: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    borderColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 30,
    color: "#000",
    paddingLeft: 5,
  },
  headingContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  headingText: {
    fontSize: 20,
    color: "#2F855A",
    fontWeight: "bold",
  },
});

export default StallMenu;
