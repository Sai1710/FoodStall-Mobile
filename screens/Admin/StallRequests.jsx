import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StallRequests() {
  const [requests, setRequests] = useState([]);
  const fetchRequests = async () => {
    const token = AsyncStorage.getItem("access-token");
    console.log(token);
    // try {
    //   axios
    //     .get(
    //       "https://b622-2401-4900-1f3e-1590-ed04-e2c0-9ce9-45e9.ngrok-free.app/api/v1/admin/requests",
    //       {
    //         headers: {
    //           Authorization: "Bearer " + AsyncStorage.getItem("access-token"),
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       const requestData = res.data.requests || [];
    //       setRequests(requestData);
    //       console.log(requests);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } catch (error) {
    //   console.error("Error fetching requests data:", error);
    // }
  };

  useEffect(() => {
    fetchRequests();
  });
  return (
    <>
      <View style={styles.navbar}>
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
      <ScrollView>
        <View>
          <Text>Stalls</Text>
        </View>
        <View></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#4caf50",
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
