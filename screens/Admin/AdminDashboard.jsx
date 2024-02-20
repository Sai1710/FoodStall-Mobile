import React from "react";
import { View, Text } from "react-native";
import DashboardCard from "../../components/DashboardCard";

const AdminDashboard = ({ navigation }) => {
  function handlePress(page) {
    navigation.navigate(page);
  }
  return (
    <View className="bg-green-100 flex-1 mt-12">
      <View className="flex-1 p-4 mt-8">
        <View className="flex justify-between">
          <Text className="text-5xl font-bold">Welcome Back,</Text>
          <Text className="text-4xl font-bold text-green-900">Admin</Text>
        </View>
        <View className="flex align-middle justify-center mt-4">
          <DashboardCard
            title="Categories"
            description="20"
            page="admin-categories"
            handlePress={handlePress}
          />
          <DashboardCard
            title="Requests"
            description="20"
            page="stall-requests"
            handlePress={handlePress}
          />
        </View>

        <View className="mt-4">{/* Add more dashboard components here */}</View>
      </View>
    </View>
  );
};

export default AdminDashboard;
