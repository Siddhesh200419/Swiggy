import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteItem } from '../utils/cartSlice';
import toast from 'react-hot-toast';
import SigninPage from './SigninPage';

import { toggleLogin } from '../utils/toggleSlice';

function Cart() {

  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSlice.userData);
  const [loginVisible, setLoginVisible] = useState(false)
  let totalPrice = 0;
  for (let i = 0; i < cartData.length; i++) {
    totalPrice = totalPrice + cartData[i].price / 100 || cartData[i].defaultPrice / 100;
  }

  // const handleRemoveFromCart = () => {
  //   dispatch(deleteItem(index));
  //   toast.success('Item removed from cart');
  // };

  function handleRemoveFromCart(i) {
    if (cartData.length > 1) {
      let newArr = [...cartData]
      newArr.splice(i, 1)
      // setCartData(newArr)
      dispatch(deleteItem(newArr))
      toast.success("Food Removed!!!!!!")

    }
    else {
      handleDeleteAll();
      toast.success("Successfully, cleared the cart.")
    }
  }


  // const handleDeleteAll = () => {
  //   dispatch(clearCart());
  //   toast.success('Cart cleared successfully');
  // };

  function handleDeleteAll() {
    dispatch(clearCart())
    toast.success("Successfully, cleared the cart.")

    // setCartData([])
    // localStorage.setItem("cartData", JSON.stringify([]))
    // localStorage.clear();
  }

  const handlePlaceOrder = () => {
    if (!userData) {
      toast.error('Please sign in to place an order');
      loginVisible()
      return;
    }
    // Mock function for placing an order
    toast.success('Order placed successfully!');
    dispatch(clearCart());
  };

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md fixed">
          <div className="mb-8 mx-auto w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-32 h-32 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-7 md:mb-2">Looks like you haven't added anything to your cart yet</p>
          <div className=''>
          <Link
            to="/"
            className="inline-block bg-orange-500 text-white px-8 py-2  rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 "
          >
            Start Ordering
          </Link>
          <br /><br />
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Link to={`/restaurantMenu/${resInfo.id}`}>
        {/* Restaurant Header */}
        <div className="max-w-4xl mx-auto mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-xl shadow-sm cursor-pointer">
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl object-cover border"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${resInfo.cloudinaryImageId}`}
              alt="Restaurant"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">{resInfo.name}</h1>
              <p className="text-sm sm:text-base text-gray-600">{resInfo.areaName}</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Cart Items */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 sm:px-6 sm:py-5 border-b">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
              Your Cart ({cartData.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {Array.isArray(cartData) && cartData.map((data, i) => (
              <div
                key={data.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 relative hover:bg-gray-50 transition-colors"
              >
                <img
                  className="w-full sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl object-cover border"
                  src={
                    data.imageId
                      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data.imageId}`
                      : "/placeholder.svg"
                  }
                  alt={data.name}
                />

                <div className="flex-1 space-y-2 w-full">
                  <div className='flex items-center gap-3'>
                    {/* Veg/Non-Veg Icon */}
                    {data?.itemAttribute?.vegClassifier === "VEG" ? (
                      <img className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm"
                        src="https://gimgs2.nohat.cc/thumb/f/640/vegetarian-food-symbol-icon-non-veg-symbol-png--m2H7H7m2K9m2Z5A0.jpg"
                        alt="Vegetarian"
                      />
                    ) : (
                      <img className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm"
                        src="https://freesvg.org/img/1531813245.png"
                        alt="Non-Vegetarian"
                      />
                    )}
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                      {data?.name}
                    </h3>
                  </div>

                  {/* Ratings and Description */}
                  <div className="space-y-1">
                    {data?.ratings?.aggregatedRating?.rating && (
                      <div className="flex items-center gap-1 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm font-medium">
                          {data.ratings.aggregatedRating.rating} ({data.ratings.aggregatedRating.ratingCountV2})
                        </span>
                      </div>
                    )}
                    {data?.description && (
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                        {data.description}
                      </p>
                    )}
                  </div>

                  <p className="text-base sm:text-lg font-semibold text-gray-800">
                    ₹{(data.price || data.defaultPrice) / 100}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(i)}
                  className="text-red-500 hover:text-red-600 p-1 sm:p-2 rounded-full hover:bg-red-50 transition-colors"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center px-4">
          <div className="order-2 sm:order-1 flex justify-center sm:justify-start">
            <button
              onClick={handleDeleteAll}
              className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2 text-sm sm:text-base"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Clear Cart
            </button>
          </div>

          <div className="order-1 sm:order-2 text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Total Price: ₹{totalPrice}
            </h2>
          </div>

          <div className="order-3 sm:order-3 flex justify-center sm:justify-end">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium hover:bg-green-600 transition duration-200 flex items-center gap-2 text-sm sm:text-base"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;


