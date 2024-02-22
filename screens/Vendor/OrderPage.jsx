import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function OrderPage({ route }) {
  const { data } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Order Details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Order Time: {data.date_time}</Text>
          <Text style={styles.detailText}>Product: {data.item.name}</Text>
          <Text style={styles.detailText}>
            Item Type: {data.item.item_type}
          </Text>
          <Text style={styles.detailText}>Price: ${data.item.price}</Text>
          <Text style={styles.detailText}>Status: {data.status}</Text>
        </View>
        <View style={styles.customerContainer}>
          <Text style={styles.title}>Customer Information</Text>
          <Text style={styles.detailText}>Name: {data.name}</Text>
          <Text style={styles.detailText}>Payment: {data.payment}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5ffec",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A523C",
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  customerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
  },
});
