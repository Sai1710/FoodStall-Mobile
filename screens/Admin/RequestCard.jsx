import { View, Text, Pressable } from "react-native";
import RequestModal from "../../components/RequestModal";
import { useState } from "react";

export default function RequestCard({ data }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <RequestModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
      />
      <View className="flex-row align-middle justify-between my-2 mx-4 bg-white rounded-lg p-3">
        <View>
          <Text
            className="m-auto p-2 font-extrabold"
            style={{ color: "rgb(20,83,45)" }}
          >
            {data.email}
          </Text>
        </View>
        <View>
          <Pressable
            className="bg-green-900 m-auto rounded-lg p-2"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white text-center text-sm font-semibold px-2">
              View
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
