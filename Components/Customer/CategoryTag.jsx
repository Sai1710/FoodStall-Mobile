import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import CheckBox from "react-native-check-box";

export default function CategoryTag({ category }) {
  const [active, setActive] = useState(false);
  return (
    <View>
      <CheckBox
        style={{ flex: 1, padding: 10 }}
        onClick={() => {
          setActive((prev) => !prev);
        }}
        isChecked={active}
      />
      <Text className={`${active === true ? "text-white" : "text-gray-800"}`}>
        {tag.name}
      </Text>
    </View>
  );
}
