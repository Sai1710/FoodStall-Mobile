import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { Checkbox } from "nativewind";

export default function MultiSelectDropdown({ data, onSelect }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    const index = selectedItems.findIndex((i) => i === item);
    if (index !== -1) {
      setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
    } else {
      setSelectedItems((prevItems) => [...prevItems, item]);
    }
  };

  return (
    <View>
      <TouchableOpacity>
        <Text>Select items...</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleItem(item)}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  checked={selectedItems.includes(item)}
                  onPress={() => toggleItem(item)}
                />
                <Text>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
