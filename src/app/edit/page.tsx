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

  if (isLoading) return <p>Loading hotels...</p>;
  if (isError) return <p>Error fetching hotels</p>;
  
  return (
    <main className="min-h-screen bg-gray-50 p-6">
{/*       <div className=""> */}
        {/* Heading */}
        <div className="flex justify-between items-center mb-6">
          <Heading2 className="text-xl sm:text-xl font-bold text-gray-900">
            Edit/Delete Hotels
          </Heading2>
          <Link
            href="/addroom"
            className="rounded-md bg-blue-600 flex justify-center items-center text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
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
              <p className="text-gray-600 mb-4"> Hotel Description: {hotel.description}</p>

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

              {/* Action - Added Delete Button */}
           
              <div className="flex justify-end space-x-3">
                {/* Delete Button */}
                <button
                    onClick={() => handleDelete(hotel._id)}
                    // Disable button while a delete request is in progress
                    disabled={isDeleting}
                    className={`rounded-md px-4 py-2 text-sm font-semibold shadow transition ${
                      isDeleting 
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                >
                    {isDeleting ? (
                        'Deleting...'
                    ) : (
                        <>
                            <Trash2 className="inline w-4 h-4 mr-1 align-text-bottom" />
                            Delete
                        </>
                    )}
                </button>
                {/* Edit Link */}
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
{/*       </div> */}
      </div>
    </main>
  );
}