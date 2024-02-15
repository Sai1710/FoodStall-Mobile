import CategoryCard from "../components/CategoryCard";
import { CATEGORIES } from "../data/dummy-data";
import { FlatList, StyleSheet, View } from "react-native";

function HomeScreen({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("List");
    }
    return (
      <CategoryCard
        title={itemData.item.title}
        link={itemData.item.link}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
      style={styles.categoryList}
    />
  );
}

const styles = StyleSheet.create({
  categoryList: {
    marginTop: 60,
  },
});

export default HomeScreen;
