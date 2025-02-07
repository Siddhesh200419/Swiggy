import { useState, useEffect } from "react"

function OnYourMind({ data }) {
  const [translateX, setTranslateX] = useState(0)
  const [itemsVisible, setItemsVisible] = useState(5)

  // Constants for carousel layout
  const ITEM_WIDTH = 160
  const GAP = 10
  const ITEM_TOTAL_WIDTH = ITEM_WIDTH + GAP

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      if (width < 640) {
        // sm
        setItemsVisible(2)
      } else if (width < 768) {
        // md
        setItemsVisible(3)
      } else if (width < 1024) {
        // lg
        setItemsVisible(4)
      } else {
        // xl and above
        setItemsVisible(5)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const MAX_TRANSLATE_X = -(ITEM_TOTAL_WIDTH * data.length - itemsVisible * ITEM_WIDTH)

  const isAtStart = translateX >= 0
  const isAtEnd = translateX <= MAX_TRANSLATE_X

  function handleNext() {
    if (!isAtEnd) {
      setTranslateX((prev) => Math.max(prev - ITEM_TOTAL_WIDTH, MAX_TRANSLATE_X))
    }
  }

  function handlePrev() {
    if (!isAtStart) {
      setTranslateX((prev) => Math.min(prev + ITEM_TOTAL_WIDTH, 0))
    }
  }

  return (
    <div className="px-4 sm:px-6 md:px-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mt-5">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">What's on your mind?</h1>
        <div className="flex gap-2 sm:gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            className={`rounded-full w-8 h-8 sm:w-9 sm:h-9 flex justify-center items-center transition-colors duration-200 ${
              isAtStart
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 cursor-pointer active:bg-gray-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={isAtStart ? "#9CA3AF" : "currentColor"}
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isAtEnd}
            className={`rounded-full w-8 h-8 sm:w-9 sm:h-9 flex justify-center items-center transition-colors duration-200 ${
              isAtEnd
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 cursor-pointer active:bg-gray-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={isAtEnd ? "#9CA3AF" : "currentColor"}
              className="w-5 h-5 sm:w-6 sm:h-6"
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

      {/* Carousel Section */}
      <div className="relative overflow-hidden mt-4">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(${translateX}px)` }}>
          {data?.map((item, index) => (
            <img
              key={index}
              className="w-[140px] sm:w-[160px] flex-shrink-0 mr-2 rounded-xl object-cover"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
              alt="food item"
            />
          ))}
        </div>
        <hr className="border mt-4" />
      </div>
    </div>
  )
}

export default OnYourMind

