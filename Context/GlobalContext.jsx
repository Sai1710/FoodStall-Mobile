import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext();

const initialState = {
  categories: [],
  cart: [],
  loading: false,
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const createCart = async () => {
    const token = await AsyncStorage.getItem("access-token");
    axios
      .post(`/api/v1/customer/carts`, {})
      .then((res) => {
        dispatch({ type: "SET_CART", payload: res.data?.cart });
        if (res.status === 200) {
          addItem();
        }
      })
      .catch((err) => {
        console.log("Axios", err);
      });
    setModalVisible(false);
  };

  const addItem = async (item) => {
    const token = await AsyncStorage.getItem("access-token");
    if (quantity != 0) {
      try {
        axios
          .post(`/api/v1/customer/carts/cart_items`, {
            cart_item: {
              food_item_id: item.id,
              quantity: quantity,
              price: quantity * item.price,
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
      setModalVisible(false);
    }
  };

  const handleAdd = async (item) => {
    const cartId = await AsyncStorage.getItem("cart-id");
    if (cartId === null) {
      createCart();
    } else {
      addItem(item);
    }
  };

  const fetchCategories = async () => {
    const token = await AsyncStorage.getItem("access_token");
    const role = await AsyncStorage.getItem("role");

    console.log("Token", token);
    axios
      .get(`/api/v1/${role ? role : "admin"}/categories`)
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_CATEGORIES", payload: res.data?.categories });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "SET_CATEGORIES", payload: [] });
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        categories: state.categories,
        loading: state.loading,
        cart: state.cart,
        fetchCategories,
        handleAdd,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
