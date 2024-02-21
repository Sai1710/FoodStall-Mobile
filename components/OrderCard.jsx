import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import ItemModal from "./ItemModal";

export default function OrderCard({ data }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 2,
          marginHorizontal: 2,
          backgroundColor: "white",
          borderRadius: 8,
          padding: 12,
        }}
      >
        <View>
          <Text style={{ color: "rgb(20,83,45)", fontWeight: "bold" }}>
            {data.name}
          </Text>
        </View>
        <View>
          <Pressable
            style={{ backgroundColor: "green", borderRadius: 8, padding: 6 }}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 14,
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
