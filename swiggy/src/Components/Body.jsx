import { useContext, useEffect, useState } from "react"
import OnYourMind from "./Onyourmind"
import TopRestaurant from "./TopRestaurant"
import OnlineFoodDelivery from "./OnlineFoodDelivery"
import { Coordinates } from "../context/contextApi"
import { useSelector } from "react-redux"
import Shimmer from "./Shimmer";
import useRestaurantData from "../Hooks/useRestaurantData"

function Body() {
  const  [topRestaurantData,topResTitle,onlineTitle,onYouMindData,data] = useRestaurantData()

  const filterVal = useSelector((state) => state.filterSlice.filterVal)

  const filteredData = topRestaurantData.filter((item) => {
    if (!filterVal) return true 

    switch (filterVal) {
      case "Ratings 4.0+":
        return item?.info?.avgRating > 4
      case "Rs. 300-Rs. 600":
        return item?.info?.costForTwo?.slice(1, 4) >= "300" && item?.info?.costForTwo?.slice(1, 4) <= "600"
      case "Less than Rs. 300":
        return item?.info?.costForTwo?.slice(1, 4) >= "300"
      case "Offers":
        return !!item?.info?.aggregatedDiscountInfoV3
      default:
        return true
    }
  })

  if (data.communication) {
    return (
      <div className="flex mt-20 sm:mt-40 md:mt-60 justify-center items-center flex-col px-4 text-center">
        <img
          className="w-48 sm:w-60 md:w-72 mb-4"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
          alt="Location unserviceable"
        />
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-2">Location Unserviceable</h1>
        <p className="text-sm sm:text-base">We don't have any service here till now. Try changing location.</p>
      </div>
    )
  }

  return (

    <div className="w-full px-4 sm:px-6 md:px-8">
      {
        topRestaurantData.length ? (<div className="w-full max-w-screen-xl mx-auto mt-3 overflow-hidden">
          {
            onYouMindData.length ? (<>
              <OnYourMind data={onYouMindData} />
              <TopRestaurant data={topRestaurantData} title={topResTitle} />

            </>)
              : ""}

          <OnlineFoodDelivery data={filterVal ? filteredData : topRestaurantData} title={onlineTitle} />
        </div>) : <Shimmer />
      }

    </div>
  )
}

export default Body

