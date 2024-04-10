import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IP_ADDRESS from "../../config";
import { AntDesign } from "@expo/vector-icons";

const StallCard = ({ data, categoryId }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("StallMenu", { stall: data, categoryId: categoryId });
  };

  return (
    <View className={`bg-white p-4 m-4 rounded-lg shadow-md flex-1 border-0.5`}>
      <Pressable onPress={handlePress}>
        <View className={`flex-row align-middle justify-start`}>
          <Image
            source={{
              uri: data.stall_logo_url
                ? data.stall_logo_url.replace("localhost", IP_ADDRESS)
                : link,
            }}
            className={`h-24 w-24 rounded`}
          />
          <View className="flex-col align-middle justify-start mx-3">
            <Text className={`text-lg font-semibold`}>{data.stall_name}</Text>
            <View className="flex-row align-middle justify-center mt-1">
              {data.type_of_categories.map((item) => {
                return (
                  <View className="border-0.5 p-0.5 rounded mr-1">
                    <Text className="text-gray-600 mx-0.5">{item}</Text>
                  </View>
                );
              })}
            </View>
            <View className="mt-3">
              <View className="flex-row align-middle justify-start">
                <AntDesign name="star" size={20} color="#FFD700" />
                <Text className="self-center ml-1 font-semibold">4.9</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default StallCard;
