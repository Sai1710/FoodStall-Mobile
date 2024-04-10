import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../Components/Custom/Navbar";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Context/GlobalContext";
import { FlatList } from "react-native";
import CartItemCard from "../../Components/Customer/CartItemCard";
import CartCardContainer from "../../Components/Customer/CartCardContainer";

function CustomerCart() {
  const { cart, categorizeCart, cartArray } = useContext(GlobalContext);
  //   const renderItem = (itemData) => {
  //     return <CartItemCard item={itemData.item} />;
  //   };
  const renderItem = (itemData) => {
    console.log(itemData.item);
    return (
      <CartCardContainer
        stallName={
          itemData?.item?.items[0]?.food_item?.vendor_category?.vendor
            .stall_name
        }
        items={itemData.item.items}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavBar title="My Cart" />
      <FlatList data={cartArray} renderItem={renderItem} />
      {/* <FlatList data={cart.cart_items} renderItem={renderItem} /> */}
    </SafeAreaView>
  );
}

export default CustomerCart;
