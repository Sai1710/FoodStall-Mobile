import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function StallCard({ data, categoryId }) {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("menu", { vendor: data, categoryId: categoryId });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.innerContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: data.stall_logo_url ? data.stall_logo_url : link }}
              style={styles.image}
            />
          </View>

          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryText}>
              {data.stall_name && data.stall_name.length !== 0
                ? data.stall_name.toUpperCase()
                : "No Stall Name"}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>View Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
    shadowColor: "#047857",
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 10,
    flex: 1,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#047857",
    padding: 6,
    borderRadius: 4,
    margin: 0,
    marginTop: 10,
  },

  image: {
    height: 160,
    width: "100%",
    alignSelf: "center",

    borderRadius: 6,
  },
  categoryTextContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 5,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 10,
  },
  imgContainer: {
    flex: 1,
    marginBottom: 8,
  },
  innerContainer: {
    flex: 1,
  },
});
