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

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn: () => getHotelApi(searchParams),
  });

  const hotelData: Hotel[] = apiResponse?.data || [];

  /* ERROR STATE */
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 px-4 sm:px-6 text-center">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-red-600 mb-4 sm:mb-6 leading-tight">
            Something Went Wrong
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8">
            Please refresh the page and try again.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">

      {/* HEADER + SEARCH */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 sm:gap-6 mb-8 sm:mb-10">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 text-center lg:text-left">
          Our Rooms
        </h1>

        <div className="w-full lg:w-auto">
          <SearchHotelsBar />
        </div>

      </div>

      {/* LOADING STATE */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 animate-pulse">

          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                {/* Image skeleton */}
                <div className="w-full h-52 sm:h-56 md:h-64 bg-gray-300" />

                <div className="p-4 sm:p-5 md:p-6">

                  <div className="space-y-3">

                    <div className="w-3/4 h-6 bg-gray-300 rounded" />

                    <div className="w-full h-4 bg-gray-200 rounded" />

                    <div className="w-5/6 h-4 bg-gray-200 rounded" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      <div className="h-4 bg-gray-300 rounded w-full" />
                      <div className="h-4 bg-gray-300 rounded w-full" />
                    </div>

                  </div>

                </div>
              </div>
            ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && hotelData.length === 0 && (
        <div className="min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md p-6 sm:p-8 my-4 text-center">

          <p className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-5 sm:mb-6">
            No rooms found at the moment.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          >
            Homepage
          </Link>

        </div>
      )}

      {/* HOTEL DATA */}
      {!isLoading && hotelData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">

          {hotelData.map((hotel) => (
            <Link
              href={`/allrooms/${hotel._id}`}
              key={hotel._id}
              className="group flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
            >

              {/* IMAGE */}
              {hotel.imageUrls && hotel.imageUrls.length > 0 && (
                <div className="relative w-full h-52 sm:h-56 md:h-64 overflow-hidden">

                  <Image
                    src={hotel.imageUrls[0]}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 600px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                </div>
              )}

              {/* CARD CONTENT */}
              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">

                {/* TITLE + STATUS */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight break-words">
                    {hotel.name}
                  </h3>

                  {hotel.roomStatus && (
                    <p className="text-sm sm:text-base font-semibold text-green-500 underline whitespace-nowrap">
                      {hotel.roomStatus}
                    </p>
                  )}

                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                  {hotel.description}
                </p>

                {/* HOTEL INFORMATION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 text-sm sm:text-base">

                  <div className="flex items-center text-gray-700 min-w-0">
                    <BsMap className="mr-2 text-blue-500 flex-shrink-0" />

                    <span className="truncate">
                      {hotel.city}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-700 min-w-0">
                    <BsBuilding className="mr-2 text-green-500 flex-shrink-0" />

                    <span className="truncate">
                      {hotel.type}
                    </span>
                  </div>

                  <div className="flex items-start sm:col-span-2 text-gray-700 font-semibold min-w-0">
                    <BiMoney className="mr-2 mt-0.5 text-purple-500 flex-shrink-0" />

                    <span className="break-words">
                      From PKR {hotel.pricePerNight} / night
                    </span>
                  </div>

                </div>

                {/* FACILITIES */}
                {hotel.facilities && hotel.facilities.length > 0 && (
                  <div className="mt-auto">

                    <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-2">
                      Key Facilities:
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {hotel.facilities.slice(0, 5).map((facility, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full border border-blue-200 shadow-sm break-words"
                        >
                          {facility}
                        </span>
                      ))}

                      {hotel.facilities.length > 5 && (
                        <span className="bg-blue-50 text-blue-700 text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full border border-blue-200 shadow-sm">
                          +{hotel.facilities.length - 5} more
                        </span>
                      )}

                    </div>
                  </div>
                )}

              </div>
            </Link>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="mt-8 sm:mt-10 md:mt-12 overflow-x-auto">
        <Pagination
          page={apiResponse?.pagination?.page || 1}
          pages={apiResponse?.pagination?.pages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

    </main>
  );
}