import React, { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { CartContext, Coordinates } from "../context/contextApi"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../utils/cartSlice"
import { clearCart, deleteItem } from '../utils/cartSlice';
//import { toggleDiffRes } from "../utils/toggleSlice"

import toast from "react-hot-toast"
import AddToCartBtn from "./AddToCartBtn"
import { toggleDiffRes } from "../utils/toggleSlice"
import { MenuShimmer } from "./shimmer"

function RestaurantMenu() {
  const { id } = useParams()
  const mainId = id.split("-").at(-1)
  const [menuData, setMenuData] = useState("")
  const [topPicksData, setTopPicksData] = useState(null)
  const [resInfo, setResInfo] = useState([])
  const [discountData, setDiscountData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [topPicksIndex, setTopPicksIndex] = useState(0)
  const {
    coord: { lat, lng },
  } = useContext(Coordinates)

  const ITEM_WIDTH = 420
  const GAP = 10
  const ITEMS_VISIBLE = 2
  const ITEM_TOTAL_WIDTH = ITEM_WIDTH + GAP

  const isAtStart = currentIndex === 0
  const isAtEnd = currentIndex >= discountData.length - ITEMS_VISIBLE

  const isTopPicksAtStart = topPicksIndex === 0
  const isTopPicksAtEnd = topPicksIndex >= (topPicksData?.card?.card?.carousel?.length || 0) - ITEMS_VISIBLE

  function handleNext() {
    if (!isAtEnd) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  function handlePrev() {
    if (!isAtStart) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  function handleTopPicksNext() {
    if (!isTopPicksAtEnd) {
      setTopPicksIndex((prev) => Math.min(prev + 1, (topPicksData?.card?.card?.carousel?.length || 0) - ITEMS_VISIBLE))
    }
  }

  function handleTopPicksPrev() {
    if (!isTopPicksAtStart) {
      setTopPicksIndex((prev) => prev - 1)
    }
  }

  async function fetchMenu() {
    const data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`,
    )
    const res = await data.json()
    const resInfo = res?.data?.cards.find((data) => data?.card?.card?.["@type"].includes("food.v2.Restaurant"))?.card?.card?.info;
    const discountInfo = res?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("v2.GridWidget"))?.card?.card?.gridElements?.infoWithStyle?.offers;

   
    setResInfo(resInfo)
    setDiscountData(discountInfo)





    let actualMenu = res?.data?.cards.find((data) => data?.groupedCard)
 




    //console.log(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
    setTopPicksData(
      (actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data.card.card.title == "Top Picks",
      )[0],
    )
    setMenuData(actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (data) => data?.card?.card?.itemCards || data?.card?.card?.categories,
    ))
  }

  useEffect(() => {
    fetchMenu()
  }, [mainId])

  return (
    <div className="w-full">
      {
        menuData.length ?       <div className="w-[90%] md:w-[800px] mx-auto pt-8">
        <p className="text-[12px] text-slate-500">
          <Link to={"/"}>
            <span className="hover:text-slate-700 hover:cursor-pointer">Home</span>
          </Link>{" "}
          /
          <Link to={"/"}>
            <span className="hover:text-slate-700 hover:cursor-pointer">{resInfo.city}</span>
          </Link>{" "}
          /<span className="text-slate-700 cursor-pointer">{resInfo.name}</span>
        </p>
        <h1 className="font-bold px-4 pb-4 text-3xl">{resInfo.name}</h1>

        {/* Restaurant Info Card */}
        <div className="w-full h-[206px] bg-gradient-to-t p-5 from-slate-300/70 mt-3 rounded-[30px]">
          <div className="w-full border border-slate-300/70 rounded-[30px] h-full bg-white">
            <div className="p-4 w-full">
              <div className="flex items-center gap-1 font-semibold">
                <p className="text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
                <span>{resInfo.avgRating}</span>
                <span>({resInfo.totalRatingsString})</span>
                <span>{resInfo.costForTwoMessage}</span>
              </div>
              <p className="underline font-semibold text-orange-500">{resInfo?.cuisines?.join(", ")}</p>

              <div className="flex gap-2 mt-2">
                <div className="w-[9px] flex flex-col justify-center items-center mt-2">
                  <div className="w-[7px] h-[7px] bg-gray-300 rounded-full"></div>
                  <div className="w-[1px] h-[25px] bg-gray-300"></div>
                  <div className="w-[7px] h-[7px] bg-gray-300 rounded-full"></div>
                </div>

                <div className="flex flex-col gap-1 text-sm font-semibold mt-1.5">
                  <p>
                    Outlet <span className="text-gray-400 font-normal">{resInfo.locality}</span>
                  </p>
                  <p>{resInfo.sla?.slaString}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Carousel  */}
        <div className="w-full overflow-hidden h-[240px]">
          <div className="flex justify-between items-center mt-8">
            <h1 className="font-bold text-xl">Deals for you</h1>
            <div className="flex gap-4">
              {['prev', 'next'].map((dir) => {
                const isDisabled = dir === 'prev' ? isAtStart || discountData.length <= ITEMS_VISIBLE : isAtEnd || discountData.length <= ITEMS_VISIBLE;
                const handleClick = dir === 'prev' ? handlePrev : handleNext;
                const iconPath = dir === 'prev'
                  ? "M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                  : "M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z";
                return (
                  <button
                    key={dir}
                    onClick={handleClick}
                    disabled={isDisabled}
                    className={`rounded-full w-7 h-7 flex justify-center items-center transition-colors duration-200 ${isDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300 cursor-pointer active:bg-gray-400"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={isDisabled ? "#9CA3AF" : "currentColor"} className="w-4 h-4">
                      <path fillRule="evenodd" d={iconPath} clipRule="evenodd" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex mt-5">
            <div className="relative overflow-hidden mt-4">
              <div className="flex gap-4 transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * ITEM_TOTAL_WIDTH}px)` }}>
                {discountData.map((data) => (
                  <Discount key={data.info.header} data={data} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Search */}
        <h2 className="text-center mt-1 leading-5">Menu</h2>
        <div className="w-full  mt-5 relative">
          <div className="w-full text-center p-3 rounded-xl font-semibold text-lg bg-slate-200 text-gray-500 cursor-pointer">
            Search for Dishes
          </div>
          <i className="cursor-pointer absolute top-0 right-12 mt-3 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 -mr-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </i>
          <div>
            {topPicksData && (
              <div className="w-full overflow-hidden">
                <div className="flex justify-between items-center mt-8">
                  <h1 className="font-bold text-xl">Top Picks</h1>
                  <div className="flex gap-4">
                    <button
                      onClick={handleTopPicksPrev}
                      disabled={isTopPicksAtStart}
                      className={`rounded-full w-7 h-7 flex justify-center items-center transition-colors duration-200 ${isTopPicksAtStart
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300 cursor-pointer active:bg-gray-400"
                        }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={isTopPicksAtStart ? "#9CA3AF" : "currentColor"}
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={handleTopPicksNext}
                      disabled={isTopPicksAtEnd}
                      className={`rounded-full w-7 h-7 flex justify-center items-center transition-colors duration-200 ${isTopPicksAtEnd
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300 cursor-pointer active:bg-gray-400"
                        }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={isTopPicksAtEnd ? "#9CA3AF" : "currentColor"}
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 mt-5 overflow-hidden">
                  <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${topPicksIndex * ITEM_TOTAL_WIDTH}px)` }}
                  >
                    <div className="flex gap-4 mt-5">
                      {topPicksData.card.card.carousel.map(
                        ({
                          creativeId,
                          dish: {
                            info: { defaultPrice, price },
                          },
                        }) => (
                          <div key={creativeId} className="min-w-[400px] h-[405px] relative">
                            <img
                              className="w-full h-full  rounded-lg"
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}
                              alt=""
                            />
                            <div className="absolute bottom-4 text-white flex justify-between w-full">
                              <p className="mt-2 ml-4 font-semibold">₹{price / 100 || defaultPrice / 100}</p>
                              <button className="px-10 mr-9 py-2 font-bold text-green-400 rounded-xl bg-white hover:bg-slate-400/20 hover:scale-105 transition-all  ease-in-out active:scale-95 duration-300">
                                Add
                              </button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-4">
          {Array.isArray(menuData) && menuData.map((item, index) => <Menucard key={index} card={item.card.card} resInfo={resInfo} />)}
        </div>
      </div> : <MenuShimmer/>
      }

    </div>
  )
}

function Menucard({ card, resInfo }) {
  const initialOpenState = card["@type"] ? true : false

  const [isOpen, setIsOpen] = useState(initialOpenState)

  function toggleDropDown() {
    setIsOpen((prev) => !prev)
  }

  if (card.itemCards) {
    const { title, itemCards } = card
    return (
      <>
        <div className="mt-7">
          <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropDown}>
            <h1 className={"font-bold text- " + (card["@type"] ? "xl" : "base")}>
              {title} ({itemCards.length})
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          {isOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />}
        </div>
        <hr className={"my-5 border-" + (card["@type"] ? "[10px]" : "[4px]")} />
      </>
    )
  } else {
    const { title, categories } = card
    return (
      <div>
        <h1 className="font-bold">{title}</h1>
        {categories.map((data, index) => (
          <Menucard key={index} card={data} resInfo={resInfo} />
        ))}
      </div>
    )
  }
}

function DetailMenu({ itemCards, resInfo }) {
  return (
    <div className="my-5">
      {itemCards.map(({ card: { info } }, index) => (
        <DetailMenuCard info={info} resInfo={resInfo} />
      ))}
    </div>
  )
}

function DetailMenuCard({ info, resInfo }) {
  const {
    name,
    defaultPrice,
    price,
    itemAttribute,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description = "",
    imageId,
  } = info;

  // const cartData = useSelector((state) => state.cartSlice.cartItems);
  // const getResInfoFromLocalStore = useSelector((state) => state.cartSlice.resInfo);
  // const dispatch = useDispatch();

  const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes);

  const dispatch = useDispatch()
  const [isMore, setIsMore] = useState(false);
  const trimDes = description.substring(0, 138) + " ...";

  // function handleAddToCart() {
  //   const isAdded = cartData.find((data) => data.id === info.id);
  //   if (!isAdded) {
  //     if (getResInfoFromLocalStore.name === resInfo.name || getResInfoFromLocalStore.length === 0) {
  //       dispatch(addToCart({ info, resInfo }));
  //       toast.success("Successfully added to cart");
  //     } else {
  //       toast.error("Data cannot be added from different restaurant!!!");
  //       handleIsDiffRes();
  //     }
  //   } else {
  //     toast.error("Data cannot be added twice!!!");
  //   }
  // }

  function handleIsDiffRes() {
    dispatch(toggleDiffRes())
  }

  function handleDeleteAll() {
    dispatch(clearCart());
    handleIsDiffRes();
  }

  return (
    <div className="relative w-full p-4 sm:p-2 md:p-4 lg:p-6">
      <div className="flex flex-col md:flex-row w-full justify-between min-h-[182px] gap-4">
        <div className="w-full md:w-[70%]">
          <div className="w-5 rounded-sm">
            {itemAttribute && itemAttribute.vegClassifier === "VEG" ? (
              <img src="https://gimgs2.nohat.cc/thumb/f/640/vegetarian-food-symbol-icon-non-veg-symbol-png--m2H7H7m2K9m2Z5A0.jpg" alt="Veg" />
            ) : (
              <img src="https://freesvg.org/img/1531813245.png" alt="Non-Veg" />
            )}
          </div>
          <h2 className="font-semibold text-lg sm:text-md md:text-lg lg:text-xl">{name}</h2>
          <p className="font-semibold text-lg sm:text-md md:text-lg">₹{price / 100 || defaultPrice / 100}</p>
          {rating && ratingCountV2 && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              <span>
                {rating} ({ratingCountV2})
              </span>
            </div>
          )}
          {description.length > 140 ? (
            <div>
              <span>{isMore ? description : trimDes}</span>
              <button className="font-bold" onClick={() => setIsMore(!isMore)}>
                {isMore ? " less " : "more"}
              </button>
            </div>
          ) : (
            <span>{description}</span>
          )}
        </div>
        <div className="w-full md:w-[30%] relative flex flex-col items-center">
          <img
            className="rounded-xl aspect-square w-32 md:w-40 lg:w-48"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
              imageId || "/placeholder.svg"
            }
            alt={name}
          />
          {/* <button
            onClick={handleAddToCart}
            className="absolute -bottom-4 md:bottom-0 left-1/2 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 bg-white text-lg font-bold rounded-xl border text-green-700 px-6 py-2 drop-shadow hover:bg-green-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out active:scale-95"
          >
            Add
          </button> */}
          <AddToCartBtn resInfo={resInfo} info={info} handleIsDiffRes={handleIsDiffRes} />
        </div>
      </div>
      <hr className="my-5" />
      {isDiffRes && (
        <div className="w-[90%] sm:w-[520px] h-auto p-6 sm:p-8 border z-50 flex flex-col gap-2 left-[50%] transform -translate-x-1/2 shadow-md fixed bottom-10 bg-white">
          <h1 className="font-semibold">Items already in cart</h1>
          <p>Your cart contains items from another restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
          <div className="flex justify-between gap-3 w-full uppercase">
            <button onClick={handleIsDiffRes} className="border-2 w-1/2 p-3 border-green-500 text-green-500">NO</button>
            <button onClick={handleDeleteAll} className="border w-1/2 p-3 bg-green-500 text-white">YES, START AFRESH</button>
          </div>
        </div>
      )}
    </div>
  );
}


function Discount({
  data: {
    info: { header, offerLogo, couponCode },
  },
}) {
  return (
    <div className="flex gap-2 min-w-[328px] border rounded-2xl p-3 h-[76px]">
      <img
        src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo}
        alt=""
      />
      <div>
        <h2 className="font-bold text-xl">{header}</h2>
        <p className="text-gray-500">{couponCode}</p>
      </div>
    </div>
  )
}

export default RestaurantMenu
