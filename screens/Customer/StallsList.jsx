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

function StallsList({ route, navigation }) {
  const { data, id } = route.params;
  const [stalls, setStalls] = useState(data);
  function renderCategoryItem(itemData) {
    return <StallCard data={itemData.item} categoryId={id} />;
  }

  return (
    <View style={styles.container}>
      <CustomerNavbar />
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Found {data.length} Stalls</Text>
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

      {stalls ? (
        <FlatList
          data={stalls}
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

export default StallsList;
