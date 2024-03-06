import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import { useNavigation } from "@react-navigation/native";

export default function CustomerNavbar({ options, activeOption, title }) {
  const navigation = useNavigation();

  return (
    <>
      <View
        style={[
          styles.navbar,
          { flexDirection: "row", backgroundColor: "#fff", marginBottom: 0 },
        ]}
      >
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => {
            navigation.navigate("home-page");
          }}
        >
          <Text style={{ color: "#2F855A", fontWeight: "900", fontSize: 24 }}>
            {title}
          </Text>
        </TouchableOpacity>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log("profile opened");
              navigation.popToTop();
            }}
          >
            <View
              style={{
                borderRadius: 100,
                backgroundColor: "white",
              }}
            >
              <Ionicons
                name="person"
                size={20}
                color="#2F855A"
                style={{ padding: 7 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    marginLeft: 20,
  },
  titleContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  menuContainer: {
    marginRight: 25,
  },
});
