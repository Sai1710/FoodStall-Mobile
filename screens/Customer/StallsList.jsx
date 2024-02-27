import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";

import StallCard from "../../components/StallCard";
import { dummyStalls } from "../../data/dummy-data";
import Loading from "../../components/Loading";
import CustomerNavbar from "../../components/CustomerNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

function StallsList({ route, navigation }) {
  const { data, id } = route.params;
  const [stalls, setStalls] = useState(data);
  const [displayedStalls, setDisplayedStalls] = useState(data);
  function renderCategoryItem(itemData) {
    return <StallCard data={itemData.item} categoryId={id} />;
  }

  const handleSearch = (searchText) => {
    const tempStalls = stalls.filter((item) =>
      item.first_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedStalls(tempStalls);
  };
  return (
    <View style={styles.container}>
      <CustomerNavbar />

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
        <Text style={styles.headingText}>
          Found {displayedStalls.length} Stalls
        </Text>
      </View>

      <FlatList
        data={displayedStalls}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stallHeading: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 10,
    backgroundColor: "#4caf50",
    padding: 6,
    borderRadius: 7,
  },
  backButtonContainer: {
    marginLeft: 20,
    marginTop: 10,
    justifyContent: "center",
    padding: 6,
  },
  backButton: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  container: {
    marginTop: 48,
    backgroundColor: "#fff",
    flex: 1,
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
});

export default StallsList;
