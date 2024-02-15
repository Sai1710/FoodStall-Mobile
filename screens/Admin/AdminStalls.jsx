import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";

export default function AdminStalls() {
  return (
    <>
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Text style={{ color: "white", fontWeight: "900", fontSize: 24 }}>
            FoodM
          </Text>
        </View>
        <View style={styles.menuContainer}>
          <Pressable>
            <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
              Menu
            </Text>
          </Pressable>
        </View>
      </View>
      <ScrollView>
        <View>
          <Text>Stalls</Text>
        </View>
        <View></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#4caf50",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    margin: 10,
  },
  menuContainer: {
    margin: 10,
  },
});
