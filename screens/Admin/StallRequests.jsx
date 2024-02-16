import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "./AdminCategories";
import DEFAULT_URL from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RequestTable from "../../components/RequestTable";

export default function StallRequests() {
  const [requests, setRequests] = useState([]);
  const [requestCategory, setRequestCategory] = useState("pending");

  const [displayedRequests, setDisplayedRequests] = useState([]);

  function categorizeRequests(category) {
    const categoryReq = requests.filter(
      (request) => request.status.toLowerCase() === category
    );
    setDisplayedRequests(categoryReq);
  }

  function handlePress() {}
  const fetchRequests = async () => {
    const token = await AsyncStorage.getItem("access-token");
    try {
      axios
        .get(`${DEFAULT_URL}/api/v1/admin/requests`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          const requestData = res.data.requests || [];
          setRequests(requestData);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching requests data:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  });
  return (
    <View className="flex justify-between bg-green-100 flex-1 mt-12">
      <View style={styles.navbar} className="bg-green-900">
        <View style={styles.logoContainer}>
          <Text style={{ color: "white", fontWeight: "900", fontSize: 24 }}>
            FoodM
          </Text>
        </View>
        <View style={styles.menuContainer}>
          <Pressable>
            <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
              Menu
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="flex justify-between ml-4 mt-8">
        <Text
          className="text-3xl font-bold"
          style={{ color: "rgb(20, 83, 45)" }}
        >
          Requests
        </Text>
      </View>
      <View className="flex-1 p-4 mt-4">
        <View className="flex-row">
          <Pressable
            className={` mr-1 flex-1 pl-2 pr-2
                 pt-2 pb-2 rounded ${
                   requestCategory == "pending" ? "bg-green-800" : "bg-gray-500"
                 } text-white font-medium`}
            onPress={() => {
              setRequestCategory("pending");
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Pending</Text>
          </Pressable>
          <Pressable
            className={` mr-1 flex-1 pl-2 pr-2
                 pt-2 pb-2 rounded ${
                   requestCategory == "approved"
                     ? "bg-green-800"
                     : "bg-gray-500"
                 } text-white font-medium`}
            onPress={() => {
              setRequestCategory("approved");
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Approved
            </Text>
          </Pressable>
          <Pressable
            className={` mr-1 flex-1 pl-2 pr-2
                 pt-2 pb-2 rounded ${
                   requestCategory == "rejected"
                     ? "bg-green-800"
                     : "bg-gray-500"
                 } text-white font-medium`}
            onPress={() => {
              setRequestCategory("rejected");
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Rejected
            </Text>
          </Pressable>
        </View>
      </View>
      <ScrollView>
        <RequestTable />
      </ScrollView>
    </View>
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
