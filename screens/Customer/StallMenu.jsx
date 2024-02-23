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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DEFAULT_URL from "../../config";
import Loading from "../../components/Loading";

function StallMenu({ route }) {
  const { vendor, categoryId } = route.params;
  const [menu, setMenu] = useState([]);
  console.log(vendor.id, categoryId);

  const fetchMenu = async () => {
    const token = await AsyncStorage.getItem("access-token");
    console.log(token);
    try {
      axios
        .get(
          `${DEFAULT_URL}/api/v1/customer/food_items?vendor_id=${vendor.id}&category_id=${categoryId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "ngrok-skip-browser-warning": true,
            },
          }
        )
        .then((response) => {
          const res = response.data.food_items || [];
          console.log(res);
          setMenu(res);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#E5FFEC" }}>
      <View>
        <View style={styles.stallHeading}>
          <Image
            source={{
              uri: "https://cdn.dribbble.com/users/1726660/screenshots/3502872/punjabi_junction_dribble3.jpg",
            }}
            style={{ height: 40, width: 40 }}
          />
          <Text style={styles.headingText}>
            {vendor.first_name + " " + vendor.last_name}
          </Text>
        </View>

        <View style={styles.headingDesign}></View>
      </View>
      <View>
        <View style={styles.menuHeading}>
          <Text style={{ fontWeight: "700", fontSize: 18, color: "#4caf50" }}>
            Menu
          </Text>
        </View>
        <View>
          {menu ? (
            menu.map((item) => {
              return <MenuItemCard key={item.id} item={item} />;
            })
          ) : (
            <Loading />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});

export default StallMenu;
