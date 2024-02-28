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
    backgroundColor: "#fff",
    padding: 10,
    paddingBottom: 15,
    margin: 12,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  image: {
    height: 160,
    width: "100%",
    alignSelf: "center",
    borderRadius: 6,
  },
  categoryTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 25,
  },
  categoryText: {
    color: "#2F855A",
    fontWeight: "bold",
  },
  imgContainer: {
    flex: 1,
    marginBottom: 8,
  },
});
