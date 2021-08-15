import firebase from "firebase";
import React, { useContext } from "react";
import Usercontext from "./user";

// const user = useContext(Usercontext)

export const initialState = {
  basket: [],
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => Number(item.price) + amount, 0);

export const reducer = (state, action) => {
  // console.log(action.item);
  switch (action.type) {
    case "DECLARE_BASKET":
      return {
        ...state,
        basket: [action.item],
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `cant nt remove product id: ${action.id} because it is not in basket`
        );
      }
      return {
        ...state,
        basket: newBasket,
        // basket: state.basket.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
};
