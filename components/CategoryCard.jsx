import { Pressable, View, Text, StyleSheet, Image } from "react-native";

export default function CategoryCard({ data, onPress }) {
  function pressHandler() {}
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.innerContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={require("../assets/ChineseFood.jpg")}
              style={styles.image}
            />
          </View>
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryText}>{data.name.toUpperCase()}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#aab880",
    padding: 10,
    paddingBottom: 15,
    margin: 12,
    borderRadius: 6,
    flex: 1,
  },
  image: {
    height: 160,
    width: "100%",
  },
  categoryTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4caf50",
    borderRadius: 5,
    height: 25,
  },
  categoryText: {
    color: "white",
    fontWeight: "bold",
  },
  imgContainer: {
    flex: 1,
    marginBottom: 8,
  },
});
