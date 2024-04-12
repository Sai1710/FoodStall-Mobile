import React, { useContext, useEffect } from "react";
import { View, Text, classNameS, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import GlobalContext from "../../Context/GlobalContext";

const VendorProfile = () => {
  const navigation = useNavigation();
  const { userInfo, setUserInfo } = useContext(GlobalContext);
  const getUser = async () => {
    const user = await AsyncStorage.getItem("user-info");
    setUserInfo(JSON.parse(user));
    console.log(userInfo);
  };
  useEffect(() => {
    getUser();
  }, []);
  const logOut = async () => {
    await AsyncStorage.clear();

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "LoginPage" }],
      })
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="QuickCrave" />
      <View className="pt-6 mx-12 bg-white rounded-lg shadow-lg">
        <View className="items-center mb-6">
          <View className="border-0.5 border-black rounded-full p-3">
            <Image
              source={{
                uri: userInfo?.stall_logo_url?.replace(
                  "localhost",
                  process.env.IP_ADDRESS
                ),
              }}
              className="w-32 h-32 rounded-full "
            />
          </View>
          <Text className="text-xl font-bold mt-2">{userInfo?.stall_name}</Text>
        </View>
        <View className="border-b border-gray-200 mb-6" />
        <View className="flex-col align-middle justify-between mb-4">
          <Text className="text-lg text-gray-400">Name:</Text>
          <View className="border-b border-gray-200 mb-3" />
          <Text className="text-lg ">
            {userInfo?.first_name} {userInfo?.last_name}
          </Text>
        </View>
        <View className="flex-col align-middle justify-between mb-4">
          <Text className="text-lg text-gray-400">Email:</Text>
          <View className="border-b border-gray-200 mb-3" />
          <Text className="text-lg ">{userInfo?.email}</Text>
        </View>
        <View className="flex-col align-middle justify-between mb-4">
          <Text className="text-lg text-gray-400">Phone Number:</Text>
          <View className="border-b border-gray-200 mb-3" />
          <Text className="text-lg ">{userInfo?.phone_number}</Text>
        </View>
      </View>
      {/* <Button title="Logout" onPress={logOut} /> */}
    </SafeAreaView>
  );
};

export default VendorProfile;
