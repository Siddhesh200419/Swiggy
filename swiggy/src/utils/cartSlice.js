import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
        resInfo: JSON.parse(localStorage.getItem("resInfo")) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const { info, resInfo } = action.payload;
            state.cartItems = [...state.cartItems, info] ;
            state.resInfo = resInfo; 
            localStorage.setItem("cartData", JSON.stringify(state.cartItems));
            localStorage.setItem("resInfo", JSON.stringify(resInfo));
        },
        deleteItem: (state,action) => { 
            state.cartItems = action.payload
            localStorage.setItem("cartData", JSON.stringify(action.payload))

        },
        clearCart: (state) => {
            state.cartItems = []
            localStorage.removeItem("cartData");
            localStorage.removeItem("resInfo");
         },
    },
});

export const { addToCart, deleteItem, clearCart } = cartSlice.actions

export default cartSlice.reducer