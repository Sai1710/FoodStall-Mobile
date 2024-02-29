import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import DEFAULT_URL from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminCategoryCard from "../../components/AdminCategoryCard";
import DeleteModal from "../../components/DeleteModal";
import CategoryModal from "../../components/CategoryModal";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";

export default function AdminCategories() {
  const [categoryData, setCategoryData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const options = [
    { Name: "Stall Requests", page: "stall-requests" },
    { Name: "Categories", page: "admin-categories" },
  ];

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("access-token");
    try {
      axios
        .get(`${DEFAULT_URL}/api/v1/admin/categories`, {
          headers: {
            Authorization: "Bearer " + token,
            "ngrok-skip-browser-warning": true,
          },
        })
        .then((response) => {
          const categories = response.data.categories || [];

          setCategoryData(categories);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  {
    /* <DeleteModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        fetchData={fetchData}
      />
      <CategoryModal
        setAddModalVisible={setAddModalVisible}
        addModalVisible={addModalVisible}
        fetchData={fetchData}
      /> */
  }

  return (
    <>
      <View style={styles.container}>
        <Navbar options={options} activeOption="Categories" />

        <View style={styles.header}>
          <Text style={styles.headerText}>Categories</Text>
          <Pressable
            style={styles.addButton}
            onPress={() => {
              setAddModalVisible((prev) => !prev);
            }}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        <ScrollView>
          <DeleteModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            fetchData={fetchData}
            data={selectedCategory}
          />
          <CategoryModal
            setAddModalVisible={setAddModalVisible}
            addModalVisible={addModalVisible}
            fetchData={fetchData}
          />
          {categoryData ? (
            categoryData.map((item) => (
              <AdminCategoryCard
                data={item}
                key={item.id}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addModalVisible={addModalVisible}
                setAddModalVisible={setAddModalVisible}
                fetchData={fetchData}
                setSelectedCategory={setSelectedCategory}
              />
            ))
          ) : (
            <Loading />
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "rgb(20, 83, 45)",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    margin: 10,
  },
  menuContainer: {
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#E5FFEC",
    marginTop: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 16,
    marginTop: 32,
    backgroundColor: "#E5FFEC",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(20, 83, 45)",
    flex: 1,
  },
  addButton: {
    flex: 1,
    padding: 8,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#047857",
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
