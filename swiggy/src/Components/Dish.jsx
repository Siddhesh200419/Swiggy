import React from "react";
import { NonVeg, Veg } from "../utils/links";
import AddToCartBtn from "./AddToCartBtn";
import { useDispatch, useSelector } from "react-redux";
import { toggleDiffRes,toggleIsSimilarResDishes } from "../utils/toggleSlice";
import { clearCart } from "../utils/cartSlice";


function Dish({ data }) {
    if (!data) return null; // Prevents errors if no data is passed

    const dispatch = useDispatch();
    const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes);

    // Extracting Data Safely
    const info = data?.card?.card?.info || {};
    const resInfo = data?.card?.card?.restaurant?.info || {};

    // Fallback values for missing properties
    const {
        imageId = "",
        name = "Unknown Dish",
        price = 0,
        isVeg = 0,
    } = info;

    const {
        name: resName = "Unknown Restaurant",
        avgRating = "N/A",
        sla: { slaString = "N/A" } = {},
    } = resInfo;

    // Handlers
    const handleIsDiffRes = () => dispatch(toggleDiffRes());
    const handleDeleteAll = () => {
        dispatch(clearCart());
        handleIsDiffRes();
    };

    const handleSameRes = () => {
       
    };

    return (
        <div className="bg-white rounded-2xl p-5 m-4 shadow-md">
            {/* Header: Restaurant Info */}
            <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <p className="font-semi-bold text-lg">{resName}</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 md:size-5 sm:size-4 lg:size-6 text-gray-400"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span>{avgRating} • {slaString}</span>
                    </div>
                </div>
            </div>

            <hr className="border-dotted my-3" />

            {/* Dish Content */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                    <img src={isVeg ? Veg : NonVeg} alt={isVeg ? "Veg" : "Non-Veg"} className="w-6 h-6" />
                    <p className="text-lg font-semibold">{name}</p>
                    <p className="text-gray-800 font-semibold mt-1">₹ {price / 100}</p>
                    <button className="px-3 py-1 mt-2 text-sm border rounded-lg hover:bg-gray-100">
                        More Details
                    </button>
                </div>
                <div className="relative flex flex-col items-center">
                    <img
                        className="rounded-xl object-cover w-32 h-32"
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                        alt={name}
                    />
                    <div onClick={handleSameRes}>
                    <AddToCartBtn resInfo={resInfo} info={info} handleIsDiffRes={handleIsDiffRes} />
                    </div>
                    
                </div>
            </div>

            {/* Cart Conflict Modal */}
            {isDiffRes && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[520px] p-6 sm:p-8 border shadow-lg rounded-xl bg-white z-50">
                    <h1 className="font-semibold text-lg">Items already in cart</h1>
                    <p className="text-gray-600 my-2">
                        Your cart contains items from another restaurant. Would you like to reset your cart before adding items from this restaurant?
                    </p>
                    <div className="flex justify-between gap-3 mt-4">
                        <button onClick={handleIsDiffRes} className="w-1/2 p-3 border-2 border-green-500 text-green-500 rounded-lg">
                            NO
                        </button>
                        <button onClick={handleDeleteAll} className="w-1/2 p-3 bg-green-500 text-white rounded-lg">
                            YES, START AFRESH
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dish;
