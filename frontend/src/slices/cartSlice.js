import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Ensure cartItems is still an array at this point
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
        // state.cartItems.push(item);
        // the correct way is state.cartItems = [...state.cartItems, item];
        // beacuse the state should be immutable and we should not change the
        // state directly so we should create a new array and add the new
        // item to it and then assign it to the state variable
      }


      // its coming from the cartUtils utils folder
        return updateCart(state);
      
    },

    

    incrementQty: (state, action) => {
        const item = state.cartItems.find((x) => x._id === action.payload._id);
        if (item && item.qty < item.countInStock) {
            item.qty += 1;
        }
        return updateCart(state);
    },

    decrementQty: (state, action) => {
        const item = state.cartItems.find((x) => x._id === action.payload._id);
        if (item && item.qty > 1) {
            item.qty -= 1;
        }
        return updateCart(state);
    },

    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
        return updateCart(state);
    },

  },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty } = cartSlice.actions;

export default cartSlice.reducer;
