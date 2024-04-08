import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import axios from "axios";
import IP_ADDRESS from "./config";
import VendorHome from "./Screens/Vendor/VendorHome";
import CustomerHome from "./Screens/Customer/CustomerHome";
import AdminHome from "./Screens/Admin/AdminHome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalProvider } from "./Context/GlobalContext";
import SignupScreen from "./Screens/VendorSignUpScreen";
import { AlertNotificationRoot } from "react-native-alert-notification";
const Stack = createNativeStackNavigator();

export default function App() {
  axios.defaults.baseURL = `http://${IP_ADDRESS}:3000`;
  axios.interceptors.request.use(
    async (config) => {
      config.headers["Authorization"] =
        "Bearer " + (await AsyncStorage.getItem("access_token"));
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return (
    <AlertNotificationRoot>
      <GlobalProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="#fff" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="LoginPage" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignupScreen} />

            <Stack.Screen name="VendorHome" component={VendorHome} />
            <Stack.Screen name="CustomerHome" component={CustomerHome} />
            <Stack.Screen name="AdminHome" component={AdminHome} />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalProvider>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
