// "use client";

// import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";
// import {  getHotelApi } from "../Api"; 
// import { useSearchContext } from "../context/SearchContext";
// import { useState } from "react";
// import { addHotelTypes } from "../components/AddHotel";
// import Pagination from "../components/Pagination";
// import SearchHotelsBar from "../components/searchHotelsBar";


  

// export default function EditDashboard() {
 
//   const search = useSearchContext();
//   const [page, setPage] = useState<number>(1);


//   const searchParams = {
//     name: search.name,
//     sortOption: search.sortOption,
//     page: page.toString(),
//   };

//   const queryKey = [
//     "searchRooms",
//     searchParams.name,
//     searchParams.sortOption,
//     searchParams.page,
//   ];

//   const {
//     data: apiResponse,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: queryKey,
//     queryFn: () => getHotelApi(searchParams),
//   });

//   if (isLoading) return <p>Loading hotels...</p>;
//   if (isError) return <p>Error fetching hotels</p>;
//   // Setup delete mutation

  
//   // Handler for canceling deletion
  
//   return (
//     <main className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Heading */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             My Hotels
//           </h1>
//           <Link
//             href="/addroom"
//             className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
//           >
//             Add Hotel
//           </Link>
//         </div>
        
//      <SearchHotelsBar/>

//         {/* Hotel Cards */}
//         <div className="space-y-6 mt-12">
//           {apiResponse?.data.map((hotel: addHotelTypes) => (
//             <div
//               key={hotel._id}
//               className="bg-white rounded-xl shadow-md border p-6"
//             >
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 {hotel.name}
//               </h2>
//               <p className="text-gray-600 mb-4">{hotel.description}</p>

//               {/* Grid Info */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4 text-sm text-gray-700">
//                 <div className="border rounded-md px-3 py-2">
//                   💰 PricePerNight: {hotel.pricePerNight}
//                 </div>
//                 <div className="border rounded-md px-3 py-2">
//                   🏨 Status: {hotel.roomStatus}
//                 </div>
//                 <div className="border rounded-md px-3 py-2">
//                   🏷️ Type: {hotel.type}
//                 </div>
//               </div>

//               {/* Action */}
           
//               <div className="flex justify-end">
//                 <Link
//                   href={`/edit/${hotel._id}`}
//                     // href={`/hotels/${hotel._id}`}
//                   className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
//                 >
//                   Edit
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-8">
//            <Pagination
//           page={apiResponse?.pagination?.page || 1}
          
          
//           pages={apiResponse?.pagination?.pages || 1}
//           onPageChange={(newPage) => setPage(newPage)}
//         />
//       </div>
//       </div>
//     </main>
//   );
// }
"use client";

import Link from "next/link";
// 1. ADDED useMutation, useQueryClient for delete feature
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHotelApi, deleteJobApi } from "../Api"; // ⬅️ Ensure deleteJobApi is imported
import { useSearchContext } from "../context/SearchContext";
import { useState } from "react";
// Assuming this is your hotel type definition path
import { addHotelTypes } from "../components/AddHotel"; 
import Pagination from "../components/Pagination";
import SearchHotelsBar from "../components/searchHotelsBar";
import { Heading2, Trash2 } from 'lucide-react'; // ⬅️ Icon for the delete button


export default function EditDashboard() {
 
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  // 2. INITIALIZE QueryClient
  const queryClient = useQueryClient();

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

  // 3. Setup Fetch Query
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () => getHotelApi(searchParams),
  });

  // 4. Setup Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (hotelId: string) => deleteJobApi(hotelId),
    onSuccess: () => {
      // Invalidate the 'searchRooms' query to force a data refresh
      queryClient.invalidateQueries({ queryKey: ["searchRooms"] });
      // Optional: Add a success notification here if you have an AppContext for it
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
      // Optional: Add a failure notification here
    },
  });

  const isDeleting = deleteMutation.isPending;

  // 5. Delete Handler
  const handleDelete = (hotelId: string) => {
    // Confirmation dialog for safety
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      deleteMutation.mutate(hotelId);
    }
  };

  if (isLoading) {

  return(
     <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-pulse">
      <div className="p-5 sm:p-6 lg:p-8">
        {/* Hotel Title Skeleton */}
        <div className="mb-3">
          <div className="h-7 sm:h-8 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
          <div className="h-7 sm:h-8 bg-gray-200 rounded-lg w-1/2"></div>
        </div>
        
        {/* Description Skeleton */}
        <div className="mb-5 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        {/* Info Grid Skeleton */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {/* Price Card */}
          <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 sm:py-2.5">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          
          {/* Status Card */}
          <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 sm:py-2.5">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          
          {/* Type Card */}
          <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 sm:py-2.5 xs:col-span-2 sm:col-span-1">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100">
          {/* Delete Button Skeleton */}
          <div className="h-10 bg-gray-200 rounded-lg w-full sm:w-28"></div>
          
          {/* Edit Button Skeleton */}
          <div className="h-10 bg-gray-200 rounded-lg w-full sm:w-24"></div>
        </div>
      </div>
    </div>
  )
};
  if (isError) return <p>Error fetching hotels</p>;
  
  return (
   <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <span className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
        Edit/Delete Hotels
      </span>
      <Link
        href="/addroom"
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        <span className="mr-2">+</span>
        Add Hotel
      </Link>
    </div>
    
    <SearchHotelsBar />

    {/* Hotel Cards Grid */}
    <div className="space-y-6 mt-8 sm:mt-12">
      {apiResponse?.data.map((hotel: addHotelTypes) => (
        <div
          key={hotel._id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300 overflow-hidden"
        >
          <div className="p-5 sm:p-6 lg:p-8">
            {/* Hotel Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
              {hotel.name}
            </h2>
            
            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 mb-5 leading-relaxed">
              <span className="font-semibold text-gray-700">Hotel Description:</span> {hotel.description}
            </p>

            {/* Info Grid - Fully Responsive */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-3 sm:py-2.5 transition-colors hover:bg-green-100">
                <span className="text-lg sm:text-base">💰</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Price/Night</p>
                  <p className="text-sm font-bold text-gray-900 truncate">${hotel.pricePerNight}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-3 sm:py-2.5 transition-colors hover:bg-blue-100">
                <span className="text-lg sm:text-base">🏨</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Status</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{hotel.roomStatus}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-lg px-3 py-3 sm:py-2.5 transition-colors hover:bg-purple-100 xs:col-span-2 sm:col-span-1">
                <span className="text-lg sm:text-base">🏷️</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Type</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{hotel.type}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons - Stacked on mobile, side-by-side on larger screens */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100">
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(hotel._id)}
                disabled={isDeleting}
                className={`flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold shadow-md transition-all duration-200 ease-in-out ${
                  isDeleting 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105'
                }`}
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </>
                )}
              </button>
              
              {/* Edit Link */}
              <Link
                href={`/edit/${hotel._id}`}
                className="flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Pagination */}
    <div className="mt-8 sm:mt-12">
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