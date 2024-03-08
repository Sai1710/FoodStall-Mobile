import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DEFAULT_URL from "../../config";
import CategoryCard from "../../components/CategoryCard";
import { CATEGORIES } from "../../data/dummy-data";
import StallCard from "../../components/StallCard";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import CartCard from "../../components/CartCard";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import CustomerNavbar from "../../components/CustomerNavbar";
import Loading from "../../components/Loading";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
function CustomerDashboard({ route, navigation }) {
  const [categoryData, setCategoryData] = useState([]);

  // const { data } = route.params;
  // console.log(data);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [displayedStalls, setDisplayedStalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("Categories");
  const [stalls, setStalls] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [cart, setCart] = useState([]);

  const tabs = ["Categories", "Stalls"];

  const handleSearch = (searchText) => {
    const tempCategories = categoryData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const tempStalls = stalls.filter((item) =>
      item.stall_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedCategories(tempCategories);
    setDisplayedStalls(tempStalls);
  };

  const handleTabPress = (index) => {
    setActiveTab(index);
    setMode(tabs[index]);
  };
  const fetchCategories = async () => {
    const token = await AsyncStorage.getItem("access-token");
    console.log(token);
    try {
      axios
        .get(`${DEFAULT_URL}/api/v1/customer/categories`, {
          headers: {
            Authorization: "Bearer " + token,
            // "ngrok-skip-browser-warning": true,
          },
        })
        .then((response) => {
          const categories = response.data.categories || [];
          let tempStalls = [];
          setCategoryData(categories);
          categories.forEach((obj) => {
            tempStalls = [...tempStalls, ...obj.vendors];
          });
          setStalls(tempStalls);
          setDisplayedStalls(tempStalls);
          setDisplayedCategories(categories);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  function renderStall(itemData) {
    return <StallCard data={itemData.item} />;
  }

  const fetchCart = async () => {
    const token = await AsyncStorage.getItem("access-token");
    const cartId = await AsyncStorage.getItem("cart-id");
    console.log(cartId);
    if (cartId !== null) {
      try {
        axios
          .get(`${DEFAULT_URL}/api/v1/customer/cart`, {
            headers: {
              Authorization: "Bearer " + token,
              "ngrok-skip-browser-warning": true,
            },
          })
          .then((response) => {
            console.log(response.data.cart);
            setCart(response.data.cart.cart_items);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    console.log(token);
  };

  function renderCategoryItem(itemData) {
    return (
      <CategoryCard
        data={itemData.item}
        onPress={() => {
          navigation.navigate("List", {
            data: itemData.item.vendors,
            id: itemData.item.id,
          });
        }}
      />
    );
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );
  // let index = data.name.indexOf(" ");
  // let name = data.name.substring(0, index + 1);
  let name = "Saikiriti";

  return (
    <View style={styles.container}>
      <CustomerNavbar title="FoodM" />
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          What are you craving today, {name}?
        </Text>
      </View>
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
      {/* <View style={styles.headingImgContainer}>
        <ImageBackground
          source={require("../../assets/VendorLoginBack.png")}
          imageStyle={styles.headingImage}
          style={{ height: "100%", width: "100%" }}
          resizeMode="cover"
          blurRadius={3}
        ></ImageBackground>
      </View> */}
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={mode === "Categories" ? displayedCategories : displayedStalls}
          keyExtractor={(item, index) => index}
          renderItem={mode === "Categories" ? renderCategoryItem : renderStall}
          numColumns={2}
        />
      )}
      {cart.length != 0 ? (
        <CartCard cart={cart} fetchCart={fetchCart} />
      ) : (
        <></>
      )}
      {/* <CartCard cart={cart} /> */}
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index && styles.activeTab]}
            onPress={() => handleTabPress(index)}
          >
            {tab === "Stalls" ? (
              <Entypo
                name="shop"
                size={20}
                color={activeTab === 1 ? "#fff" : "#2F855A"}
              />
            ) : (
              <MaterialIcons
                name="fastfood"
                size={20}
                color={activeTab === 0 ? "#fff" : "#2F855A"}
              />
            )}
            {activeTab === index && (
              <Text
                style={[
                  styles.tabText,
                  activeTab === index && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    backgroundColor: "#fff",
    flex: 1,
  },
  headingImgContainer: {
    width: "100%",
    height: 400, // Adjust the height as needed
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#047857",
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 10,
  },
  headingContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  headingImage: {
    height: "100%",
    width: "100%",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 20,
    borderTopLeftRadius: 20,
    overflow: "hidden",
  },
  headingText: {
    fontSize: 20,
    color: "#2F855A",
    fontWeight: "bold",
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
    flex: 1,
    color: "#000",
    paddingLeft: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
  },
  tab: {
    flex: 1,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2F855A",
  },
  activeTab: {
    backgroundColor: "#2F855A",
  },
  activeTabText: {
    color: "#fff",
  },
});

export default CustomerDashboard;
