import { Pressable, View, Text, StyleSheet, Image } from "react-native";

export default function CategoryCard({ title, link, onPress }) {
  function pressHandler() {}
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.innerContainer}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: link }} style={styles.image} />
          </View>
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryText}>{title}</Text>
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
    margin: 10,
    borderRadius: 10,
    flex: 1,
  },
  image: {
    height: 160,
    flex: 1,
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
  innerContainer: {
    flex: 1,
  },
});
