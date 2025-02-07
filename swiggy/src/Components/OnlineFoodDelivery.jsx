import { useState, useEffect } from "react"
import RestaurantCard from "./RestaurantCard"
import { useDispatch } from "react-redux"
import { setFilterValue } from "../utils/filterSlice"

function OnlineFoodDelivery({ data, title }) {
  const filterOptions = [
    { filterName: "Ratings 4.0+" },
    { filterName: "Rs. 300-Rs. 600" },
    { filterName: "Less than Rs. 300" },
    { filterName: "Offers" },
  ]

  const [activeBtn, setActiveBtn] = useState(null)
  const dispatch = useDispatch()

  // Fix: Dispatch filter value only when activeBtn changes
  useEffect(() => {
    dispatch(setFilterValue(activeBtn))
  }, [activeBtn, dispatch])

  function handleFilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? null : filterName)
  }

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      {/* Responsive title */}
      <h1 className="font-bold mt-6 text-xl md:text-3xl lg:text-3xl  mb-4">
        {title}
      </h1>

      {/* Filter buttons with horizontal scroll on mobile */}
      <div className="my-7 flex flex-wrap items-center gap-3 overflow-x-auto pb-2 whitespace-nowrap scrollbar-hide">
        {filterOptions.map((data, index) => (
          <button
            key={index}
            onClick={() => handleFilterBtn(data.filterName)}
            className={`filterBtn flex  items-center px-3 py-2 text-sm md:text-base  rounded-lg transition-colors ${
              activeBtn === data.filterName 
                ? "bg-black text-white" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <p>{data.filterName}</p>
            {activeBtn === data.filterName && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-6">
        {data.map(({ info, cta: { link } }, index) => (
          <div 
            key={index}
            className="hover:scale-[0.98] transition-transform duration-300 ease-in-out"
          >
            <RestaurantCard {...info} link={link} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OnlineFoodDelivery