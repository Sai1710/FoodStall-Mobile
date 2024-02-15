import { Pressable, View, Text, StyleSheet, Image } from "react-native";

export default function StallCard({ title, link }) {
  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.innerContainer}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: link }} style={styles.image} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={{ color: "white", fontWeight: "700" }}>{title}</Text>
          </View>
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryText}>Explore</Text>
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
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
