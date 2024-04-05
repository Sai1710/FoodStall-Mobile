import { Pressable, View, Text, Image } from "react-native";

export default function CategoryCard({ data, onPress }) {
  function pressHandler() {}
  return (
    <View className={`bg-white p-10 pb-15 m-12 rounded-lg shadow-md flex-1`}>
      <Pressable onPress={onPress}>
        <View className={`flex-1 mb-8`}>
          <Image
            source={require("../assets/ChineseFood.jpg")}
            className={`h-160 w-full self-center rounded-lg`}
          />
        </View>
        <View className={`justify-center items-center rounded h-25`}>
          <Text className={`text-green-700 font-bold`}>
            {data.name.toUpperCase()}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
