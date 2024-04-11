import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Context/GlobalContext";
import { FlatList, View, Text } from "react-native";
import CartItemCard from "../../Components/Customer/CartItemCard";
import CartCardContainer from "../../Components/Customer/CartCardContainer";

function CustomerCart() {
  const { getCart, cartArray } = useContext(GlobalContext);
  //   const renderItem = (itemData) => {
  //     return <CartItemCard item={itemData.item} />;
  //   };
  useEffect(() => {
    getCart();
  }, []);
  const renderItem = (itemData) => {
    console.log(itemData.item);
    return (
      <CartCardContainer
        stall={itemData?.item?.items[0]?.food_item?.vendor_category?.vendor}
        items={itemData.item.items}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="My Cart" />
      {cartArray.length !== 0 ? (
        <FlatList data={cartArray} renderItem={renderItem} />
      ) : (
        <View className="flex-1 align-middle justify-center items-center">
          <Text className="text-2xl text-gray-300">No Items in Cart</Text>
        </View>
      )}

      {/* <FlatList data={cart.cart_items} renderItem={renderItem} /> */}
    </SafeAreaView>
  );
}

export default CustomerCart;
