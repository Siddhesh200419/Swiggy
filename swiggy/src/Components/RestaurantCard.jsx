import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantCard(info) {
    

    return (
        // <Link to={`/restaurantMenu/${info.link.split("/")[5].replace("rest", "")}`}>
        <Link to={`/restaurantMenu/${info.link.split("/").pop().replace("rest", "")}`}>

            <div className="relative h-[182px] mb-2">
                <img
                    className="w-full h-full rounded-2xl object-cover"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`}
                    alt={info.name || "Restaurant"}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black from-1% to-transparent to-40% rounded-2xl"></div>
                {/* Discount Info */}
                {info.aggregatedDiscountInfoV3 && (
                    <p className="absolute bottom-3 left-2 text-white text-xl font-bold">
                        {info.aggregatedDiscountInfoV3.header}{" "}
                        {info.aggregatedDiscountInfoV3.subHeader}
                    </p>
                )}
            </div>
            <div className="mt-3">

                <h2 className="text-lg font-semibold">{info.name}</h2>

                <p className="text-green-500 flex items-center gap-1 text-base font-semibold">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {info.avgRating} • {info?.sla?.slaString}
                </p>

                <p className="line-clamp-1 text-black/60 font-medium">
                    {info.cuisines.join(", ")}
                </p>

                <p className="line-clamp-1 text-black/60 font-medium">
                    {info.locality}
                </p>
            </div>

        </Link>
    )
}

export default RestaurantCard