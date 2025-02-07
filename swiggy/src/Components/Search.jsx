import React, { useContext, useEffect, useState } from "react";
import SearchRestaurant, { withHoc } from "./SearchRestaurant";
import { Coordinates } from "../context/contextApi";
import Dish from "./Dish";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsSimilarResDishes } from "../utils/toggleSlice";

const IMAGE_BASE_URL =
    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";

function Search() {
    // ... existing state and logic ...
    const [searchQuery, setSearchQuery] = useState("");
    const [dishes, setDishes] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);
    const [activeBtn, setActiveBtn] = useState(null);
    const [coord, setCoord] = useState({ lat: 28.65200, lng: 77.16630 })
    const filterOptions = [
        { filterName: "Restaurant" },
        { filterName: "Dishes" },
    ];
    const PromotedRes = withHoc(SearchRestaurant)
    const {
        coord: { lat, lng },
    } = useContext(Coordinates)
    const dispatch = useDispatch()
    // const {isSimilarResDish} = useSelector((state)=> state.toogleSlice)
    //const isSimilarResDishes = useSelector((state) => state.toggleSlice.isSimilarResDishes);
    const isSimilarResDishes = useSelector((state) => state.toggleSlice.isSimilarResDishes);
    //console.log(isSimilarResDish)
    function handleFilterBtn(filterName) {
        // Toggle the filter: if it's already active, turn it off
        setActiveBtn(activeBtn === filterName ? null : filterName);
    }


    function handleSearchQuery(e) {
        let val = e.target.value
        if (e.keyCode == 13) {
            setSearchQuery(val)
        }
    }



    useEffect(() => {
        if (isSimilarResDishes) {
            fetchSimilarResDishes();
        }
    }, [isSimilarResDishes])


    async function fetchSimilarResDishes() {
        try {
            let data = await fetch(
                `${import.meta.env.VITE_BASE_URL}/dapi/restaurants/search/v3?lat=28.6105073&lng=77.1145653&str=pizza&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=%2Fcity%2Fdelhi%2Fthe-tummy-section-jail-road-rest45516%3Fquery%3Dpizza&restaurantIdOfAddedItem=45516&itemAdded=92594906`);
            let res = await data.json();
            console.log(res?.data?.cards[1])
            console.log(res?.data?.cards[2])
            dispatch(toggleIsSimilarResDishes())
        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    }
    async function fetchDishes() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8df&submitAction=ENTER&queryUniqueId=7abcdce29-5ac6-7673-9156-30226e032f0`
            );
            const res = await response.json();
            const dishesData =
                res?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.filter(
                    (item) => item.card?.card?.info
                ) || [];
            setDishes(dishesData);
        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    }

    async function fetchRestaurantData() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=7abcdce29-5ac6-7673-9156-30226e032f0&selectedPLTab=RESTAURANT`
            );
            const res = await response.json();
            const restaurants =
                res?.data?.cards?.[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.filter(
                    (item) => item.card?.card?.info
                ) || [];
            setRestaurantData(restaurants);
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
        }
    }

    useEffect(() => {
        if (searchQuery.trim() === "") {
            // Clear results if the search query is empty
            setDishes([]);
            setRestaurantData([]);
            return;
        }
        fetchDishes();
        fetchRestaurantData();
        // eslint-disable-next-line
    }, [searchQuery]);


    return (
        <div className="w-full max-w-screen-xl mx-auto p-4 md:p-6">
            {/* Search Bar */}
            <div className="w-full flex flex-col items-center mb-6">
                <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                    <input
                        //onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchQuery}
                        className="w-full px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition-all"
                        type="text"
                        placeholder="Search for restaurants and dishes..."
                    />
                    <svg
                        className="absolute right-4 top-3.5 h-6 w-6 text-gray-400 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="my-6 flex flex-wrap items-center gap-2">
                {filterOptions.map((data, index) => (
                    <button
                        key={index}
                        onClick={() => handleFilterBtn(data.filterName)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeBtn === data.filterName
                            ? "bg-orange-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {data.filterName}
                    </button>
                ))}
            </div>

            {/* Restaurant Data Here */}
            {activeBtn === "Restaurant" && (
                <div className="w-full mt-4 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#f4f5f7]">
                    {restaurantData.map((data, index) => (
                        data?.card?.card?.info?.promoted ? <PromotedRes data={data}/> :
                        <SearchRestaurant key={index} data={data} />
                    ))}
                </div>
            )}

            {activeBtn === "Dishes" && (
                <div className="w-full mt-4 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#f4f5f7]">
                    {dishes.map((data, index) => (
                        <Dish key={index} data={data} />
                    ))}
                </div>
            )}


        </div>
    );
}

export default Search;