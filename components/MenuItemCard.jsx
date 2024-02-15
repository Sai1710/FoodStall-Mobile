import { StyleSheet, View, Image } from "react-native";

export default function MenuItemCard() {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg",
          }}
          style={{ height: 70, width: 70 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderColor: "black",
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    height: 100,
  },
  imgContainer: {
    margin: 12,
  },
});
