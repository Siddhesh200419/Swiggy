import React from "react";

function Shimmer() {
    return (
        <div className="w-full animate-pulse">
            <div className="w-full text-white flex justify-center items-center gap-5 flex-col h-[300px] sm:h-[350px] bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent animate-[shimmer_2s_infinite]" />
                <div className="relative flex items-center">
                    <img
                        className="w-12 sm:w-16 opacity-80 animate-pulse"
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
                        alt="Loading"
                    />
                </div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-400">
                    Finding delicious food near you...
                </h1>
            </div>
            <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto py-6 flex flex-wrap gap-6 md:gap-8 lg:gap-10 justify-center">
                {Array(12).fill(null).map((_, i) => (
                    <div key={i} className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[250px] h-[160px] sm:h-[180px] md:h-[200px] rounded-xl bg-gray-700 animate-pulse shadow-md relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-[shimmer_2s_infinite]"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shimmer;

export function MenuShimmer() {
    return (
        <div className="w-full lg:w-[60%] mx-auto mt-10 animate-pulse">
            <div className="w-full h-40 sm:h-60 md:h-80 bg-gray-600 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-[shimmer_2s_infinite]"></div>
            </div>
            <div className="w-full flex mt-6 justify-between">
                <div className="w-[45%] h-10 sm:h-12 bg-gray-600 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>
                <div className="w-[45%] h-10 sm:h-12 bg-gray-600 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>
            </div>
            <div className="w-full mt-10 flex flex-col gap-8">
                {Array(5).fill(null).map((_, i) => (
                    <div key={i} className="w-full h-32 sm:h-40 flex justify-between">
                        <div className="w-[60%] flex flex-col gap-4">
                            <div className="w-[100%] h-5 bg-gray-600 rounded-md relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-[shimmer_2s_infinite]"></div>
                            </div>
                            <div className="w-[50%] h-5 bg-gray-600 rounded-md relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-[shimmer_2s_infinite]"></div>
                            </div>
                            <div className="w-[30%] h-5 bg-gray-600 rounded-md relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-[shimmer_2s_infinite]"></div>
                            </div>
                        </div>
                        <div className="w-[35%] sm:w-[30%] rounded-xl bg-gray-600 h-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// CSS Keyframe (Add this in your global styles)
/* @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: 200px 0; }
} */
