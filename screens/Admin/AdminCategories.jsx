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



export default function AdminCategories() {
  const [categoryData, setCategoryData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

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
  return (
    <>
      {/* <DeleteModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        fetchData={fetchData}
      />
      <CategoryModal
        setAddModalVisible={setAddModalVisible}
        addModalVisible={addModalVisible}
        fetchData={fetchData}
      /> */}
      <View className="flex-1 bg-green-100 mt-12">
        <View className="flex justify-between bg-green-100">
          <View style={styles.navbar} className="bg-green-900">
            <View style={styles.logoContainer}>
              <Text style={{ color: "white", fontWeight: "900", fontSize: 24 }}>
                FoodM
              </Text>
            </View>
            <View style={styles.menuContainer}>
              <Pressable>
                <Text
                  style={{ color: "white", fontWeight: "900", fontSize: 16 }}
                >
                  Menu
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="flex-row justify-between m-4 mt-8">
            <Text
              className="flex-1 text-3xl font-bold"
              style={{ color: "rgb(20, 83, 45)" }}
            >
              Categories
            </Text>
            <Pressable
              className="flex-1 p-2 m-2rounded-lg"
              onPress={() => {
                setAddModalVisible((prev) => !prev);
              }}
            >
              <Text className="font-bold text-center text-green-900">Add</Text>
            </Pressable>
          </View>
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
          {categoryData.map((item) => {
            return (
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
            );
          })}
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
});
