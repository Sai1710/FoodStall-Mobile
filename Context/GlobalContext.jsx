import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext();

const initialState = {
  categories: [],
  loading: false,
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const fetchCategories = async () => {
    const token = await AsyncStorage.getItem("access_token");
    const role = await AsyncStorage.getItem("role");

    console.log("Token", token);
    if (token) {
      axios
        .get(`/api/v1/${role}/categories`)
        .then((res) => {
          console.log(res);
          dispatch({ type: "SET_CATEGORIES", payload: res.data?.categories });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        categories: state.categories,
        loading: state.loading,
        fetchCategories,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
