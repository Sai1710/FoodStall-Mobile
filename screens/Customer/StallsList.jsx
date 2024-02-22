import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import StallCard from "../../components/StallCard";
import { dummyStalls } from "../../data/dummy-data";

function renderCategoryItem(itemData) {
  return <StallCard title={itemData.item.title} link={itemData.item.link} />;
}

function StallsList() {
  return (
    <View>
      <View style={styles.stallHeading}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Stalls</Text>
      </View>
      <View>
        <FlatList
          data={dummyStalls}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          numColumns={2}
          style={styles.categoryList}
        />
      </View>
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
});

export default StallsList;
