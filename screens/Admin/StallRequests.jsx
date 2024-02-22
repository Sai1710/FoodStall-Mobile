import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "./AdminCategories";
import DEFAULT_URL from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RequestCard from "../../components/RequestCard";
import RequestModal from "../../components/RequestModal";
import { StatusBar } from "expo-status-bar";

export default function StallRequests() {
  const [requests, setRequests] = useState([]);
  const [requestCategory, setRequestCategory] = useState("pending");
  const [modalVisible, setModalVisible] = useState(false);

  const [displayedRequests, setDisplayedRequests] = useState([]);

  function categorizeRequests(category) {
    const categoryReq = requests.filter(
      (request) => request.status.toLowerCase() === category
    );
    console.log(categoryReq);
    setDisplayedRequests(categoryReq);
  }

  function renderRequestItem(itemData) {
    console.log(itemData.item);
    return <RequestCard data={itemData.item} />;
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
          const categoryReq = requestData.filter(
            (request) => request.status.toLowerCase() === "pending"
          );
          setDisplayedRequests(categoryReq);
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
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#EDF7ED", marginTop: 48 }}>
      <StatusBar backgroundColor="#fff" />
      <Navbar />
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#14532D" }}>
          Requests
        </Text>
      </View>
      <View style={{ flexDirection: "row", padding: 16 }}>
        <Pressable
          style={{
            backgroundColor:
              requestCategory === "pending" ? "#047857" : "#7C7C7C",
            flex: 1,
            padding: 10,
            margin: 4,
            borderRadius: 10,
          }}
          onPress={() => {
            setRequestCategory("pending");
            categorizeRequests("pending");
          }}
        >
          <Text style={{ color: "white", textAlign: "center", margin: "auto" }}>
            Pending
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor:
              requestCategory === "approved" ? "#047857" : "#7C7C7C",
            flex: 1,
            padding: 10,
            margin: 4,
            borderRadius: 10,
          }}
          onPress={() => {
            setRequestCategory("approved");
            categorizeRequests("approved");
          }}
        >
          <Text style={{ color: "white", textAlign: "center", margin: "auto" }}>
            Approved
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor:
              requestCategory === "rejected" ? "#047857" : "#7C7C7C",
            flex: 1,
            padding: 10,
            margin: 4,
            borderRadius: 10,
          }}
          onPress={() => {
            setRequestCategory("rejected");
            categorizeRequests("rejected");
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Rejected</Text>
        </Pressable>
      </View>
      <ScrollView>
        {displayedRequests.map((item) => (
          <RequestCard
            data={item}
            key={item.id}
            setModalVisible={setModalVisible}
            fetchRequests={fetchRequests}
          />
        ))}
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
  titleContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  menuContainer: {
    margin: 10,
  },
});
