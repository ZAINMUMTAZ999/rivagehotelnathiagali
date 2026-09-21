"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney } from "react-icons/bi";

import { getHotelApi } from "../Api";
import Pagination from "../components/Pagination";
import { useSearchContext } from "../context/SearchContext";
import SearchHotelsBar from "../components/searchHotelsBar";

// Define your Hotel interface to replace 'any'
interface Hotel {
  _id: string;
  name: string;
  roomStatus?: string;
  description: string;
  city: string;
  type: string;
  pricePerNight: number;
  imageUrls?: string[];
  facilities?: string[];
}

export default function AllRoomPage() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  const searchParams = {
    name: search.name,
    sortOption: search.sortOption,
    page: page.toString(),
  };

  const queryKey = [
    "searchRooms",
    searchParams.name,
    searchParams.sortOption,
    searchParams.page,
  ];

  const { data: apiResponse, isLoading, isError } = useQuery({
    queryKey: queryKey,
    queryFn: () => getHotelApi(searchParams),
  });

  const hotelData: Hotel[] = apiResponse?.data || [];

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-600 mb-6">
            Something Went Wrong Please refresh
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8">
            The page you are looking for needs a refresh.
          </p>
          <Link href="/">
            <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HEADER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl mt-2 sm:text-4xl lg:text-5xl font-extrabold text-gray-800 text-center sm:text-left">
          Our Rooms
        </h1>
        <SearchHotelsBar />
      </div>

      {/* 2. LOADING STATE */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 animate-pulse">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="w-full h-56 md:h-64 lg:h-48 xl:h-56 bg-gray-300"></div>
                <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>
                  {/* <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                    <div className="w-24 h-8 bg-gray-300 rounded"></div>
                  </div> */}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 3. EMPTY STATE */}
      {!isLoading && hotelData.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-lg shadow-md p-8 my-4">
          <p className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
            No rooms found at the moment.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            HomePage
          </button>
        </div>
      )}

      {/* 4. DATA STATE */}
      {!isLoading && hotelData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
          {hotelData.map((hotel) => (
            <Link
              href={`/allrooms/${hotel._id}`}
              key={hotel._id}
              className="flex flex-col active:bg-slate-500 active:text-slate-700 active:scale-95 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out group"
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
                  <div className="flex justify-between">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight truncate">
                      {hotel.name}
                    </h3>
                    <p className="text-lg sm:text-lg font-semibold text-green-500 mb-2 tracking-tighter underline truncate">
                      {hotel.roomStatus}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                    {hotel.description}
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
                      <span>From PKR : {hotel.pricePerNight} / night</span>
                    </div>
                  </div>

                  {hotel.facilities && hotel.facilities.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-md font-medium text-gray-800 mb-2">
                        Key Facilities:
                      </h3>
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

                {/* <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                  <span className="bg-blue-600 text-white text-sm sm:text-base font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200">
                    View Details
                  </span>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 5. PAGINATION */}
      <div className="mt-8">
        <Pagination
          page={apiResponse?.pagination?.page || 1}
          pages={apiResponse?.pagination?.pages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}