import { View, Text, Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export default function Navbar() {
  const [menuVisibles, setMenuVisible] = useState(false);
  return (
    <>
      <View
        style={[
          styles.navbar,
          { flexDirection: "row", backgroundColor: "#047857" },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={{ color: "white", fontWeight: "900", fontSize: 24 }}>
            FoodM
          </Text>
        </View>
        <View style={styles.menuContainer}>
          <Pressable
            onPress={() => {
              setMenuVisible(true);
            }}
          >
            <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
              <FontAwesome name="navicon" size={20} color="#fff" />
            </Text>
          </Pressable>
        </View>
      </View>
      {menuVisibles && <Menu />}
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "rgb(20, 83, 45)",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    margin: 10,
  },
  titleContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  menuContainer: {
    margin: 10,
  },
});
