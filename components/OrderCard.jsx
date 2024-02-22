import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function OrderCard({ data }) {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 8,
          marginHorizontal: 16,
          backgroundColor: "white",
          borderRadius: 8,
          padding: 12,
        }}
      >
        <View>
          <Text
            style={{
              color: "rgb(20,83,45)",
              fontWeight: "800",
              margin: "auto",
            }}
          >
            {data.name}
          </Text>
        </View>
        <View>
          <Pressable
            style={{ backgroundColor: "green", borderRadius: 8, padding: 8 }}
            onPress={() => {
              navigation.navigate("order-item", { data: data });
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "600",
                fontSize: 14,
                paddingHorizontal: 8,
              }}
            >
              View
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
