import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Tags({ tag }) {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity
      key={tag.id}
      onPress={() => {
        setActive((prev) => !prev);
        console.log(active);
      }}
      className={`py-2 px-4 rounded-full mr-1  ${
        active === true ? "bg-green-900" : "bg-gray-200"
      }`}
    >
      <Text className={`${active === true ? "text-white" : "text-gray-800"}`}>
        {tag.name}
      </Text>
    </TouchableOpacity>
  );
}
