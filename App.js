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
import StallMenu from "./screens/Customer/StallMenu";
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
import { AlertNotificationRoot } from "react-native-alert-notification";
import { useContext } from "react";
import { AuthContext } from "./Schemas/AuthContext";
const stack = createNativeStackNavigator();

const App = () => {
  return (
    <AlertNotificationRoot>
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <stack.Screen name="home-page" component={HomePage} />
          <stack.Screen name="customer-login" component={CustomerLogin} />
          <stack.Screen name="home-screen" component={CustomerDashboard} />
          <stack.Screen name="List" component={StallsList} />
          <stack.Screen name="menu" component={StallMenu} />
          <stack.Screen name="vendor-login" component={VendorLogin} />
          <stack.Screen
            name="vendor-registration"
            component={VendorRegistration}
          />
          <stack.Screen name="admin-login" component={AdminLogin} />
          <stack.Screen
            name="admin-registration"
            component={AdminRegistration}
          />
          <stack.Screen
            name="customer-registration"
            component={CustomerRegistration}
          />
          <stack.Screen name="vendor-menu" component={VendorMenu} />
          <stack.Screen name="stall-requests" component={StallRequests} />
          <stack.Screen name="add-item" component={AddItem} />
          <stack.Screen name="edit-item" component={EditItem} />
          <stack.Screen name="vendor-orders" component={VendorOrders} />
          <stack.Screen name="order-item" component={OrderPage} />
          <stack.Screen name="admin-categories" component={AdminCategories} />
        </stack.Navigator>
      </NavigationContainer>
    </AlertNotificationRoot>
  );
};

export default withExpoSnack(App);
