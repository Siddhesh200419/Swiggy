import { useContext, useEffect, useState } from "react"
import { Coordinates } from "../context/contextApi"

function useRestaurantData() {
    const [topRestaurantData, setTopRestaurantData] = useState([])
    const [topResTitle, setTopResTitle] = useState("")
    const [onlineTitle, setOnlineTitle] = useState("")
    const [onYouMindData, setOnYourMindData] = useState([])
    const [data, setData] = useState({})
    const {
        coord: { lat, lng },
    } = useContext(Coordinates)


    async function fetchData() {
        try {
            const response = await fetch(
                `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
            )
            const result = await response.json()
            // console.log(result)
            setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title)
            setOnlineTitle(result?.data?.cards[2]?.card?.card?.title)
            setData(result.data)

            let mainData = result?.data?.cards.find(
                (data) => data?.card?.card?.id === "top_brands_for_you"
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

            let mainData2 = result?.data?.cards.find(
                (data) => data?.card?.card?.id === "restaurant_grid_listing"
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

            let data2 = result?.data?.cards.find(
                (data) => data?.card?.card?.id === "whats_on_your_mind" // ✅ Fixed
            )?.card?.card?.imageGridCards?.info;

            // Now, update state after variables are defined
            setTopRestaurantData(mainData || mainData2 || []);
            setOnYourMindData(data2 || []);

            // console.log(mainData)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [lat, lng]) // Added fetchData to dependencies

return [topRestaurantData,topResTitle,onlineTitle,onYouMindData,data]
}

export default useRestaurantData