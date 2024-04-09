import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IP_ADDRESS from "../../config";

const StallCard = ({ data, categoryId }) => {
  const link = "https://www.happyeater.com/images/default-food-image.jpg";
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("StallMenu", { stall: data, categoryId: categoryId });
  };

  return (
    <View
      className={`bg-white p-4 pb-6 m-4 rounded-lg shadow-md flex-1`}
      style={{
        shadowColor: "#047857",
        shadowOffset: { width: 10, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 3.84,
        elevation: 10,
        flex: 1,
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        <View className={`flex-1`}>
          <View className={`mb-2`}>
            <Image
              source={{
                uri: data.stall_logo_url
                  ? data.stall_logo_url.replace("localhost", IP_ADDRESS)
                  : link,
              }}
              className={`h-40 w-full rounded`}
            />
          </View>
          <View className={`flex-row justify-between items-center`}>
            <Text className={`text-base font-semibold`}>{data.stall_name}</Text>
            <TouchableOpacity
              className={`bg-[#047857] px-4 py-2 rounded`}
              onPress={handlePress}
            >
              <Text className={`text-white font-semibold text-sm`}>
                View Menu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StallCard;
