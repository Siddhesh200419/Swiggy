import React from "react";

function SearchRestaurant({ data }) {
    if (!data) return null; // Handle missing or undefined data

    // Safely extract restaurant details
    const info = data?.card?.card?.info || {};
    const {
        name = "Unknown Restaurant",
        cloudinaryImageId = "",
        cuisines = [],
        promoted = false,
        costForTwoMessage = "",
        avgRating = "N/A",
        sla: { slaString = "N/A" } = {},
    } = info;

    return (
        <div className="bg-white m-4 p-4 flex gap-5 items-center rounded-xl shadow-md md:max-w-md">
            {/* Restaurant Image */}
            <div className="w-[30%]">
                <img
                    className="aspect-square rounded-lg object-cover"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`}
                    alt={name}
                />
            </div>

            {/* Restaurant Details */}
            <div className="w-[60%]">
                <p className="font-bold text-lg truncate">{name}</p>
                <p className="flex items-center gap-1 text-gray-700 text-sm my-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <span>{avgRating} • {costForTwoMessage}</span>
                </p>
                <p className="text-sm text-gray-600 truncate">{cuisines.join(", ") || "No cuisines available"}</p>
            </div>
        </div>
    );
}

export default SearchRestaurant;

export function withHoc(WrappedComp){
    return (prop) => {
        return(
            <div className="relative">
                <p className="absolute top-8 text-sm bg-gray-700 px-1 left-5 text-white rounded-md">Ad</p>
                <WrappedComp {...prop}/>
            </div>
        )
    };
}
