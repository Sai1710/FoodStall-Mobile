import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DEFAULT_URL from "../../config";
import CategoryCard from "../../components/CategoryCard";
import { CATEGORIES } from "../../data/dummy-data";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import axios from "axios";
import CustomerNavbar from "../../components/CustomerNavbar";
import Loading from "../../components/Loading";

function CustomerDashboard({ route, navigation }) {
  const [categoryData, setCategoryData] = useState([]);
  // const { data } = route.params;
  // console.log(data);
  const [displayedCategories, setDisplayedCategories] = useState([]);

  const handleSearch = (searchText) => {
    const tempCategories = categoryData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedCategories(tempCategories);
  };

  const fetchCategories = async () => {
    const token = await AsyncStorage.getItem("access-token");
    try {
      axios
        .get(`${DEFAULT_URL}/api/v1/customer/categories`, {
          headers: {
            Authorization: "Bearer " + token,
            "ngrok-skip-browser-warning": true,
          },
        })
        .then((response) => {
          const categories = response.data.categories || [];
          console.log(categories);
          setCategoryData(categories);
          setDisplayedCategories(categories);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
  useState(() => {
    fetchCategories();
  });
  // let index = data.name.indexOf(" ");
  // let name = data.name.substring(0, index + 1);
  let name = "Saikiriti";

  return (
    <View style={styles.container}>
      <CustomerNavbar />
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          What are you craving today, {name}?
        </Text>
      </View>
      <View style={styles.seaarchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(searchText) => {
            handleSearch(searchText);
          }}
        />
      </View>
      {displayedCategories ? (
        <FlatList
          data={displayedCategories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          numColumns={2}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    backgroundColor: "#EDF7ED",
    flex: 1,
  },
  headingContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  headingText: {
    fontSize: 40,
    color: "#4caf50",
    fontWeight: "bold",
  },
  seaarchContainer: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: "#000",
    paddingLeft: 10,
  },
});

export default CustomerDashboard;
