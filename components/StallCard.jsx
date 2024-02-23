import { Pressable, View, Text, StyleSheet, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function StallCard({ data, categoryId }) {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("menu", { vendor: data, categoryId: categoryId });
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <View style={styles.innerContainer}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: link }} style={styles.image} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={{ color: "white", fontWeight: "700" }}>
              {data.first_name}
            </Text>
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
