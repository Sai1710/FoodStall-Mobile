import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import { useNavigation } from "@react-navigation/native";

export default function Navbar({ options, activeOption }) {
  const [menuVisibles, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <View
        style={[
          styles.navbar,
          { flexDirection: "row", backgroundColor: "#047857", marginBottom: 0 },
        ]}
      >
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => {
            navigation.navigate("home-page");
          }}
        >
          <Text style={{ color: "white", fontWeight: "900", fontSize: 24 }}>
            FoodM
          </Text>
        </TouchableOpacity>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => {
              setMenuVisible((prev) => !prev);
            }}
          >
            <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
              {!menuVisibles ? (
                <FontAwesome name="navicon" size={20} color="#fff" />
              ) : (
                <AntDesign name="close" size={20} color="#fff" />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {menuVisibles && <Menu options={options} activeOption={activeOption} />}
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
    marginRight: 25,
  },
});
