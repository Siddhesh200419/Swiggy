import { configureStore, createSlice } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice";
import cartSlice from "./cartSlice"
import filterSlice from "./filterSlice";
import authSlice from "./authSlice"

const store = configureStore({
  reducer: {
    toggleSlice: toggleSlice,
    cartSlice : cartSlice,
    filterSlice : filterSlice,
    authSlice : authSlice
  }
});

export default store;