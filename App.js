import React from "react";
import { withExpoSnack } from "nativewind";
import AdminRegistration from "./screens/Admin/AdminRegistration";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import StallRequests from "./screens/Admin/StallRequests";
import StallsList from "./screens/Customer/StallsList";
import OrderPage from "./screens/Vendor/OrderPage";
import EditItem from "./screens/Vendor/EditItem";
import VendorLogin from "./screens/Vendor/VendorLogin";
import AdminLogin from "./screens/Admin/AdminLogin";
import MenuScreen from "./screens/MenuScreen";
import CustomerDashboard from "./screens/Customer/CustomerDashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VendorRegistration from "./screens/Vendor/VendorRegistration";
import AdminCategories from "./screens/Admin/AdminCategories";
import VendorOrders from "./screens/Vendor/VendorOrders";
import VendorMenu from "./screens/Vendor/VendorMenu";
import CustomerLogin from "./screens/Customer/CustomerLogin";
import AddItem from "./screens/Vendor/AddItem";
import HomePage from "./screens/HomePage";
import CustomerRegistration from "./screens/Customer/CustomerRegistration";
const StyledView = styled(View);
const StyledText = styled(Text);

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        {/* <stack.Screen
          name="home-page"
          component={HomePage}
          options={{ headerShown: false }}
        /> */}
        <stack.Screen
          name="home-screen"
          component={CustomerDashboard}
          options={{ headerShown: false }}
        />

        {/*   <stack.Screen name="List" component={StallsList} />
        <stack.Screen name="menu" component={MenuScreen} /> */}
        <stack.Screen
          name="vendor-login"
          component={VendorLogin}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="vendor-registration"
          component={VendorRegistration}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="admin-login"
          component={AdminLogin}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="admin-registration"
          component={AdminRegistration}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="customer-login"
          component={CustomerLogin}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="customer-registration"
          component={CustomerRegistration}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="vendor-menu"
          component={VendorMenu}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="stall-requests"
          component={StallRequests}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="add-item"
          component={AddItem}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="edit-item"
          component={EditItem}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="vendor-orders"
          component={VendorOrders}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="order-item"
          component={OrderPage}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="admin-categories"
          component={AdminCategories}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default withExpoSnack(App);
