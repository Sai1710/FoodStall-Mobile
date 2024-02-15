import CategoryCard from "../components/CategoryCard";
import MenuItemCard from "../components/MenuItemCard";
import { CATEGORIES } from "../data/dummy-data";
import { FlatList, StyleSheet, View, Text, Image } from "react-native";

function MenuScreen() {
  return (
    <>
      <View>
        <View style={styles.stallHeading}>
          <Image
            source={{
              uri: "https://cdn.dribbble.com/users/1726660/screenshots/3502872/punjabi_junction_dribble3.jpg",
            }}
            style={{ height: 40, width: 40 }}
          />
          <Text style={styles.headingText}>Punjabi Junction</Text>
        </View>

        <View style={styles.headingDesign}></View>
      </View>
      <View>
        <View style={styles.menuHeading}>
          <Text style={{ fontWeight: "700", fontSize: 18, color: "#4caf50" }}>
            Menu
          </Text>
        </View>
        <View>
          <MenuItemCard />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  stallHeading: {
    backgroundColor: "#4caf50",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 32,
    color: "white",
    marginLeft: 10,
  },
  headingDesign: {
    backgroundColor: "#4caf50",
    height: 40,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  menuHeading: {
    margin: 40,
  },
});

export default MenuScreen;
