import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from "../utils/cartSlice"

function AddToCartBtn({info,resInfo}) {
    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const getResInfoFromLocalStore = useSelector((state) => state.cartSlice.resInfo);
    const dispatch = useDispatch();
    function handleAddToCart() {
        const isAdded = cartData.find((data) => data.id === info.id);
        if (!isAdded) {
            if (getResInfoFromLocalStore.name === resInfo.name || getResInfoFromLocalStore.length === 0) {
                dispatch(addToCart({ info, resInfo }));
                toast.success("Successfully added to cart");
            } else {
                toast.error("Data cannot be added from different restaurant!!!");
                handleIsDiffRes();
            }
        } else {
            toast.error("Data cannot be added twice!!!");
        }
    }
    return (
        <div>
            <button
                onClick={handleAddToCart}
                className="absolute -bottom-4 md:bottom-0 left-1/2 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 bg-white text-lg font-bold rounded-xl border text-green-700 px-6 py-2 drop-shadow hover:bg-green-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out active:scale-95"
            >
                Add
            </button>
        </div>
    );
}

export default AddToCartBtn;