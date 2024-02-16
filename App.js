import React from "react";
import { withExpoSnack } from "nativewind";
import AdminRegistration from "./screens/Admin/AdminRegistration";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import StallRequests from "./screens/Admin/StallRequests";
import CategoryPage from "./screens/CategoryPage";
import VendorLogin from "./screens/Vendor/VendorLogin";
import AdminLogin from "./screens/Admin/AdminLogin";
import AdminStalls from "./screens/Admin/AdminStalls";
import MenuScreen from "./screens/MenuScreen";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VendorRegistration from "./screens/Vendor/VendorRegistration";
const StyledView = styled(View);
const StyledText = styled(Text);

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        {/* <stack.Screen name="Home" component={HomeScreen} /> */}
        {/* <stack.Screen name="List" component={CategoryPage} /> */}
        {/* <stack.Screen name="menu" component={MenuScreen} /> */}
        {/* <stack.Screen
          name="vendor-login"
          component={VendorLogin}
          options={{ headerShown: false }}
        /> */}
        {/* <stack.Screen
          name="vendor-registration"
          component={VendorRegistration}
          options={{ headerShown: false }}
        /> */}
        {/* <stack.Screen
          name="admin-registration"
          component={AdminRegistration}
          options={{ headerShown: false }}
        /> */}
        {/* <stack.Screen
          name="admin-dashboard"
          component={AdminDashboard}
          options={{ headerShown: false }}
        /> */}
        {/* <stack.Screen
          name="admin-login"
          component={AdminLogin}
          options={{ headerShown: false }}
        /> */}
        <stack.Screen
          name="stall-requests"
          component={StallRequests}
          options={{ headerShown: false }}
        />
        {/* <stack.Screen name="admin-stalls" component={AdminStalls} /> */}
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default withExpoSnack(App);
