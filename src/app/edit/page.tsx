"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getHotelApi } from "../Api"; 
import { useSearchContext } from "../context/SearchContext";
import { useState } from "react";
import { addHotelTypes } from "../components/AddHotel";
import Pagination from "../components/Pagination";
import SearchHotelsBar from "../components/searchHotelsBar";

export default function EditDashboard() {
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
    queryKey: queryKey,
    queryFn: () => getHotelApi(searchParams),
  });

  if (isLoading) return <p>Loading hotels...</p>;
  if (isError) return <p>Error fetching hotels</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Hotels
          </h1>
          <Link
            href="/addroom"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
          >
            Add Hotel
          </Link>
        </div>
        
     <SearchHotelsBar/>

        {/* Hotel Cards */}
        <div className="space-y-6 mt-12">
          {apiResponse?.data.map((hotel: addHotelTypes) => (
            <div
              key={hotel._id}
              className="bg-white rounded-xl shadow-md border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {hotel.name}
              </h2>
              <p className="text-gray-600 mb-4">{hotel.description}</p>

              {/* Grid Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4 text-sm text-gray-700">
                <div className="border rounded-md px-3 py-2">
                  💰 PricePerNight: {hotel.pricePerNight}
                </div>
                <div className="border rounded-md px-3 py-2">
                  🏨 Status: {hotel.roomStatus}
                </div>
                <div className="border rounded-md px-3 py-2">
                  🏷️ Type: {hotel.type}
                </div>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <Link
                  href={`/edit/${hotel._id}`}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
                >
                  Edit
                </Link>
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
    </main>
  );
}
