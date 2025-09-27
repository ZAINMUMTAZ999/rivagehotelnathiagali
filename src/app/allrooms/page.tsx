"use client";
import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";

import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney } from "react-icons/bi";
import { getHotelApi } from "../Api";
// import { addHotelTypes } from "../../../backend/src/models/addHotel.models";
import Pagination from "../components/Pagination";
import { useState } from "react";
// import { addHotelTypes } from "../../../backend/src/models/addHotel.models";
// import { useSearchContext } from "../context/SearchContext";
// import Link from "next/link";
import Image from "next/image";
// import { Button } from "../components/ui/button";
// import MyHotelsById from "../components/singleroom";
import Link from "next/link";

export default function Page () {
    // const search = useSearchContext();
      const [page, setPage] = useState<number>(1);
        // const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
    
  const searchParams = {
    // title: search.title,
    page: page.toString(),
  };
    //   type hotelSearchResponse = {
    //   data:addHotelTypes[];
    // pagination:{
    //   total:number,
    //   page:number,
    //   pages:number,
    // }
    // };

  const { data: apiResponse, isLoading } = useQuery({
  queryKey: ["rooms", searchParams], // include params so cache updates when they change
  queryFn: () => getHotelApi(searchParams),
  // keepPreviousData: true,
});
// const selectedBlog = selectedBlogId
// ? apiResponse?.data.find((blog) => blog._id === selectedBlogId)
// : null;
// if (selectedBlog) {
//   return <MyHotelsById hotel={selectedBlog}  isloadingID={isLoading} />;
// }
// console.log("selectedblog",selectedBlog);
  const hotelData = apiResponse?.data || "";
// console.log(apiResponse)
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 mt-12 px-4 sm:px-6 lg:px-8 animate-pulse">
  {/* Heading skeleton */}
  <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
    <div className="w-40 sm:w-64 h-10 bg-gray-300 rounded"></div>
  </div>

  {/* Grid of hotel cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
    {Array(4).fill(0).map((_, idx) => (
      <div
        key={idx}
        className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      >
        {/* Image placeholder */}
        <div className="w-full h-56 md:h-64 lg:h-48 xl:h-56 bg-gray-300"></div>

        {/* Card content skeleton */}
        <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
          <div className="space-y-3">
            {/* Hotel name */}
            <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
            {/* Hotel description */}
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
            {/* Hotel facilities */}
            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>

            {/* Location / Type / Price */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>

            {/* Key facilities tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="w-16 h-5 bg-gray-200 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Button placeholder */}
          <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
            <div className="w-24 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Pagination skeleton */}
  <div className="mt-8 flex justify-center space-x-2">
    {Array(3).fill(0).map((_, idx) => (
      <div key={idx} className="w-8 h-8 bg-gray-300 rounded-full"></div>
    ))}
  </div>
</div>

    );
  }

//   if (isError) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] p-4 bg-red-50 rounded-lg shadow-md">
//         <p className="text-2xl font-bold text-red-700 mb-2">Error!</p>
//         <p className="text-lg text-red-600 text-center">
//           Failed to load hotels. Please check your network connection or try again later.
//         </p>
//       </div>
//     );
//   }


  if (!hotelData || hotelData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 rounded-lg shadow-lg p-8 m-4 sm:m-6 md:m-8">
        <p className="text-3xl font-extrabold text-gray-800 mb-6 text-center">No Hotels Found Yet!</p>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-prose">
          It looks like you haven&lsquo;t added any hotels to your portfolio. Let&apos;s get started!
        </p>
       
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 mt-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 text-center sm:text-left">
          Our Rooms
        </h1>
     
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out group"
          >
            {hotel.imageUrls && hotel.imageUrls.length > 0 && (
              <div className="w-full h-56 md:h-64 lg:h-48 xl:h-56 overflow-hidden">
           
                <Image
                  src={hotel.imageUrls[0]}
                  alt={hotel.name}
                width={400}
  height={300}
  unoptimized
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>
            )}
            <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight truncate">
                  {hotel.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                  {hotel.description}
                </p>
                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                  {hotel.facilities}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mb-4 text-sm sm:text-base">
                  <div className="flex items-center text-gray-700">
                    <BsMap className="mr-2 text-blue-500 flex-shrink-0" />
                    <span>{hotel.city}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <BsBuilding className="mr-2 text-green-500 flex-shrink-0" />
                    <span>{hotel.type}</span>
                  </div>
                 
                  <div className="flex items-center text-gray-700 font-semibold">
                    <BiMoney className="mr-2 text-purple-500 flex-shrink-0" />
                    <span>PKR : {hotel.pricePerNight} / night</span>
                  </div>
                </div>

                {hotel.facilities && hotel.facilities.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Key Facilities:</h3>
                    <div className="flex flex-wrap gap-2">
                      {hotel.facilities.slice(0, 5).map((facility, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 text-xs sm:text-sm px-3 py-1 rounded-full border border-blue-200 shadow-sm"
                        >
                          {facility}
                        </span>
                      ))}
                      {hotel.facilities.length > 5 && (
                        <span className="bg-blue-50 text-blue-700 text-xs sm:text-sm px-3 py-1 rounded-full border border-blue-200 shadow-sm">
                          +{hotel.facilities.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                <Link
                  // to={`/allRooms/${hotel._id}`}
                  href={`/allrooms/${hotel._id}`}
                  //  onClick={() => handleReadMore(hotel._id)}
                  className="bg-indigo-600 text-white text-sm sm:text-base font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 hover:cursor-pointer"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
           <Pagination
          page={apiResponse?.pagination?.page || 1}
          
          
          pages={apiResponse?.pagination?.pages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

// export default MyHotels;
