import React, { useState, useEffect, useRef } from "react";
import RestaurantCard from "./RestaurantCard";

function TopRestaurant({ data = [], title }) {
  const [translateX, setTranslateX] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(4);
  const [itemWidth, setItemWidth] = useState(295);
  const containerRef = useRef(null);
  
  const GAP = 20;

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      
      let newItemsVisible;
      let newItemWidth;

      if (containerWidth < 640) { // sm
        newItemsVisible = 1;
        newItemWidth = containerWidth - 40; // Account for padding
      } else if (containerWidth < 768) { // md
        newItemsVisible = 2;
        newItemWidth = (containerWidth - GAP - 40) / 2;
      } else if (containerWidth < 1024) { // lg
        newItemsVisible = 3;
        newItemWidth = (containerWidth - 2*GAP - 40) / 3;
      } else { // xl+
        newItemsVisible = 4;
        newItemWidth = 295;
      }

      setItemsVisible(newItemsVisible);
      setItemWidth(newItemWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const totalWidth = itemWidth * data.length + GAP * (data.length - 1);
    const visibleWidth = itemsVisible * itemWidth;
    const newMaxTranslateX = data.length > itemsVisible 
      ? -(totalWidth - visibleWidth) 
      : 0;

    setTranslateX(prev => Math.min(Math.max(prev, newMaxTranslateX), 0));
  }, [itemsVisible, itemWidth, data.length]);

  const totalWidth = itemWidth * data.length + GAP * (data.length - 1);
  const visibleWidth = itemsVisible * itemWidth;
  const MAX_TRANSLATE_X = data.length > itemsVisible 
    ? -(totalWidth - visibleWidth) 
    : 0;

  const ITEM_TOTAL_WIDTH = itemWidth + GAP;
  const isAtStart = translateX >= 0;
  const isAtEnd = translateX <= MAX_TRANSLATE_X;

  function handleNext() {
    setTranslateX(prev => {
      const newTranslate = prev - ITEM_TOTAL_WIDTH;
      return Math.max(newTranslate, MAX_TRANSLATE_X);
    });
  }

  function handlePrev() {
    setTranslateX(prev => {
      const newTranslate = prev + ITEM_TOTAL_WIDTH;
      return Math.min(newTranslate, 0);
    });
  }

  return (
    <div className="py-4 px-5" ref={containerRef}>
      <div className="flex justify-between items-center mt-5">
        <h1 className="font-bold text-3xl mb-4">{title}</h1>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            
            className={`rounded-full w-9 h-9 flex justify-center items-center transition-colors duration-200 ${
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
          <button
            onClick={handleNext}
            disabled={isAtEnd}
            className={`rounded-full w-9 h-9 flex justify-center items-center transition-colors duration-200 ${
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

      <div className="relative mt-4">
        <div className="flex overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {data.map(({ info, cta: { link } }, index) => (
              <div 
                key={index} 
                style={{ width: `${itemWidth}px` }}
                className="mr-5 hover:scale-90 duration-300"
              >
                <RestaurantCard {...info} link={link} />
              </div>
            ))}
          </div>
        </div>
        <hr className="border mt-6" />
      </div>
    </div>
  );
}

export default TopRestaurant;