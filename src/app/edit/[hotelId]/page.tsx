// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import { EditHotelById } from "../../Api"; // Assuming this is correct
// // import { AlertCircle } from "lucide-react";
// import { AppContext } from "@/app/context/AppNotify"; // Assuming this is correct
// import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { hotelFacilities, hotelTypes } from "@/app/config/hotelOption"; // Assuming this is correct
// import { useEffect } from "react"; // ⬅️ NEW: Import useEffect
// import Image from "next/image";

// export type addHotelTypes = {
//   _id: string;
//   userId: string;
//   name: string;
//   city: string;
//   description: string;
//   type: string;
//   facilities: string[];
//   pricePerNight: number;
//   imageUrls: string[];
//   imageFiles: FileList;
//   roomStatus: string;
//   lastUpdated: Date;
// };

// export default function EditHotelsById() {
//   const params = useParams();
//   const hotelId = params?.hotelId as string;
//   const { isAdmin } = AppContext(); // Assuming AppContext returns {isAdmin: boolean}

//   const {
//     data: hotel,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["hotel", hotelId],
//     queryFn: () => EditHotelById(hotelId || ""),
//     enabled: !!hotelId,
//   });

//   // 1. Initialize useForm
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue, // ⬅️ Must be here
//     watch, // ⬅️ IMPORTANT: Get the reset function
//   } = useForm<addHotelTypes>();

//   // 2. Use useEffect to set default values when the hotel data is fetched
//   useEffect(() => {
//     if (hotel) {
//       // This will pre-populate the form fields with the fetched data
//       // provided the field names (e.g., 'name', 'city') match the keys in the 'hotel' object.
//       // NOTE: `pricePerNight` needs to be a number, make sure your API returns it as such.
//       reset(hotel);
//     }
//   }, [hotel, reset]); // Dependency on 'hotel' ensures it runs after data is available

//   console.log("hotel", hotel);

//   // ... (Your existing loading, error, and access denied states)

//   if (isLoading) {
//     return (
//       <p>Loading hotel data for editing...</p> // Simplified loading state
//       // Use your existing loading JSX if preferred
//     );
//   }

//   if (isError || !hotel) {
//     // Check !hotel here
//     return (
//       <div className="container mx-auto px-4 py-8 mt-24 text-center">
//         {/* ... (Your error JSX) */}
//       </div>
//     );
//   }
// const existingImageUrls: string[] = watch("imageUrls") || []; 

//   // ⬅️ Add this function to your component:
//   const handleDeleteImage = (
//     event: React.MouseEvent<HTMLButtonElement>,
//     imageUrl: string
//   ) => {
//     event.preventDefault();

//     const updatedImageUrls = existingImageUrls.filter(
//       (url) => url !== imageUrl
//     );

//     // Use setValue to manually update the form state (imageUrls array)
//     setValue("imageUrls", updatedImageUrls, { shouldValidate: true });
//   };
//   const onSubmit = handleSubmit((formDataJson: addHotelTypes) => {
//     // ... (Your submission logic for the form data)
//     console.log("Form Submitted with:", formDataJson);
//     // You would call your update API mutation here
//   });

//   const roomStatusOptions = ["Available", "Booked", "Maintenance"];

//   if (!isAdmin) {
//     // ... (Your access denied JSX)
//   }

//   return (
//     // ... (Your JSX form structure remains the same)
//     // The key is that `register` is now connected to `defaultValues` set by `reset(hotel)`
//     <div className="mt-8">
//       <form onSubmit={onSubmit}>
//         <div className="min-h-screen   bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//           {/* Header Section */}
//           <div className="sticky  top-0 z-20 bg-white/70 backdrop-blur-md border-b border-slate-200/40">
//             <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
//               <h1 className="text-lg underline sm:text-xl font-bold text-slate-800">
//                 Add Room
//               </h1>
//               <Link
//                 href="/dashboard"
//                 className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-700 to-rose-600 px-4 py-2 text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all text-sm"
//               >
//                 Go to Dashboard
//               </Link>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//             <div className="bg-white/70 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
//               <div className="divide-y divide-slate-100">
//                 {/* Basic Information Section */}
//                 <div className="p-6 sm:p-8 lg:p-10">
//                   <div className="flex items-center space-x-3 mb-8">
//                     <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
//                       <span className="text-white font-bold text-sm">1</span>
//                     </div>
//                     <h2 className="text-xl md:text-2xl font-bold text-slate-800">
//                       Basic Information
//                     </h2>
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//                     {/* Hotel Name */}
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-slate-700">
//                         Hotel Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="Enter hotel name"
//                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
//                         {...register("name", {
//                           required: "Hotel name is required",
//                         })}
//                       />
//                       {errors.name && (
//                         <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                           <span>⚠</span>
//                           <span>{errors.name.message}</span>
//                         </p>
//                       )}
//                     </div>

//                     {/* City */}
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-slate-700">
//                         City <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="Enter city name"
//                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
//                         {...register("city", { required: "City is required" })}
//                       />
//                       {errors.city && (
//                         <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                           <span>⚠</span>
//                           <span>{errors.city.message}</span>
//                         </p>
//                       )}
//                     </div>
//                     {/* Rooms  */}

//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-slate-700">
//                         Room Status <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                         {...register("roomStatus", {
//                           required: "Room status is required",
//                         })}
//                       >
//                         <option value="">Select room status</option>
//                         {roomStatusOptions.map((status) => (
//                           <option key={status} value={status}>
//                             {status}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.roomStatus && (
//                         <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                           <span>⚠</span>
//                           <span>{errors.roomStatus.message}</span>
//                         </p>
//                       )}
//                     </div>

//                     {/* Description - Full Width */}
//                     <div className="lg:col-span-2 space-y-2">
//                       <label className="block text-sm font-semibold text-slate-700">
//                         Description <span className="text-red-500">*</span>
//                       </label>
//                       <textarea
//                         rows={4}
//                         placeholder="Describe your hotel's unique features, amenities, and what makes it special..."
//                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none"
//                         {...register("description", {
//                           required: "Description is required",
//                         })}
//                       />
//                       {errors.description && (
//                         <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                           <span>⚠</span>
//                           <span>{errors.description.message}</span>
//                         </p>
//                       )}
//                     </div>

//                     {/* Price */}
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-slate-700">
//                         Price per Night <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
//                           $
//                         </span>
//                         <input
//                           type="number"
//                           min="0"
//                           step="1"
//                           placeholder="0"
//                           className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
//                           {...register("pricePerNight", {
//                             required: "Price is required",
//                             min: {
//                               value: 1,
//                               message: "Price must be greater than 0",
//                             },
//                           })}
//                         />
//                       </div>
//                       {errors.pricePerNight && (
//                         <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                           <span>⚠</span>
//                           <span>{errors.pricePerNight.message}</span>
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Hotel Type Section */}
                // <div className="p-6 sm:p-8 lg:p-10">
                //   <div className="flex items-center space-x-3 mb-8">
                //     <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                //       <span className="text-white font-bold text-sm">2</span>
                //     </div>
                //     <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                //       Hotel Type
                //     </h2>
                //   </div>

                //   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                //     {hotelTypes.map((type) => (
                //       <label key={type} className="group cursor-pointer">
                //         <div className="relative p-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-blue-300 group-hover:shadow-md has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md">
                //           <input
                //             type="radio"
                //             value={type}
                //             className="sr-only"
                //             {...register("type", {
                //               required: "Please select a hotel type",
                //             })}
                //           />
                //           <div className="text-center">
                //             <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                //               {type}
                //             </div>
                //           </div>
                //           <div className="absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-slate-300 bg-white group-has-[:checked]:border-blue-500 group-has-[:checked]:bg-blue-500">
                //             <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-has-[:checked]:opacity-100"></div>
                //           </div>
                //         </div>
                //       </label>
                //     ))}
                //   </div>
                //   {errors.type && (
                //     <p className="mt-4 text-red-500 text-sm font-medium flex items-center space-x-1">
                //       <span>⚠</span>
                //       <span>{errors.type.message}</span>
                //     </p>
                //   )}
                // </div>

//                 {/* Facilities Section */}
                // <div className="p-6 sm:p-8 lg:p-10">
                //   <div className="flex items-center space-x-3 mb-8">
                //     <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                //       <span className="text-white font-bold text-sm">3</span>
                //     </div>
                //     <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                //       Facilities & Amenities
                //     </h2>
                //   </div>

                //   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                //     {hotelFacilities.map((facility) => (
                //       <label key={facility} className="group cursor-pointer">
                //         <div className="relative p-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-purple-300 group-hover:shadow-md has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50 has-[:checked]:shadow-md">
                //           <input
                //             type="checkbox"
                //             value={facility}
                //             className="sr-only"
                //             {...register("facilities", {
                //               validate: (facilities) => {
                //                 return facilities && facilities.length > 0
                //                   ? true
                //                   : "Select at least one facility";
                //               },
                //             })}
                //           />
                //           <div className="text-center">
                //             <div className="text-sm font-semibold text-slate-700 group-hover:text-purple-600">
                //               {facility}
                //             </div>
                //           </div>
                //           <div className="absolute top-2 right-2 w-4 h-4 rounded border-2 border-slate-300 bg-white group-has-[:checked]:border-purple-500 group-has-[:checked]:bg-purple-500">
                //             <div className="w-2 h-2 text-white text-xs flex items-center justify-center opacity-0 group-has-[:checked]:opacity-100">
                //               ✓
                //             </div>
                //           </div>
                //         </div>
                //       </label>
                //     ))}
                //   </div>
                //   {errors.facilities && (
                //     <p className="mt-4 text-red-500 text-sm font-medium flex items-center space-x-1">
                //       <span>⚠</span>
                //       <span>{errors.facilities.message}</span>
                //     </p>
                //   )}
                // </div>

//                 {/* Images Section */}
//                 {/* <div className="p-6 sm:p-8 lg:p-10">
//               <div className="flex items-center space-x-3 mb-8">
//                 <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">4</span>
//                 </div>
//                 <h2 className="text-xl md:text-2xl font-bold text-slate-800">Hotel Images</h2>
//               </div>

//               <div className="space-y-4">
//                 <div className="border-2 border-dashed border-slate-300 rounded-xl p-1 text-center bg-white/30 backdrop-blur-sm hover:border-rose-400 transition-colors duration-200">
//                   <div className="space-y-4">
                  
//                     <div>
//                       <label className="cursor-pointer">
//                         <span className="text-lg font-semibold text-slate-700 hover:text-rose-600 transition-colors">
//                           Click to upload images📷
//                         </span>
//                         <input
//                           type="file"
//                           multiple
//                           accept="image/*"
//                           className="sr-only"
//                           {...register("imageFiles", {
//                             validate: (files) => {
//                               if (!files || files.length === 0) return "Please select at least one image";
//                               if (files.length > 6) return "Maximum 6 images allowed";
//                               return true;
//                             }
//                           })}
//                         />
//                       </label>
//                       <p className="text-sm text-slate-500 mt-2">
//                         Upload 1-6 high-quality images (JPG, PNG, WebP)
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 {errors.imageFiles && (
//                 <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                   <span>⚠</span>
//                   <span>{errors.imageFiles.message}</span>
//                 </p>
//               )}
//               </div>
//             </div> */}
//  <div className="p-6 sm:p-8 lg:p-10">
//                   <div className="flex items-center space-x-3 mb-8">
//                     <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
//                       <span className="text-white font-bold text-sm">4</span>
//                     </div>
//                     <h2 className="text-xl md:text-2xl font-bold text-slate-800">
//                       Hotel Images ({existingImageUrls.length}/6)
//                     </h2>
//                   </div>

//                   <div className="space-y-4">
//                     {/* 1. Display Existing Images */}
//                     {existingImageUrls.length > 0 && (
//                       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
//                         {existingImageUrls.map((url) => (
//                           <div key={url} className="relative group overflow-hidden rounded-xl border border-slate-300 shadow-sm">
//                             <Image
//                               src={url} 
//                               alt="Existing Hotel Image" 
//                               className="w-full h-32 object-cover" 
//                               fill
//                             />
//                             {/* Delete Button Overlay */}
//                             <button
//                               onClick={(e) => handleDeleteImage(e, url)} 
//                               className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                               type="button" 
//                             >
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                               </svg>
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
                    
//                     {/* 2. Upload New Images Input */}
//                     <div className="border-2 border-dashed border-slate-300 rounded-xl p-1 text-center bg-white/30 backdrop-blur-sm hover:border-rose-400 transition-colors duration-200">
//                       <div className="space-y-4">
//                         <div>
//                           <label className="cursor-pointer">
//                             <span className="text-lg font-semibold text-slate-700 hover:text-rose-600 transition-colors">
//                               Click to upload new images📷
//                             </span>
//                             <input
//                               type="file"
//                               multiple
//                               accept="image/*"
//                               className="sr-only"
//                               {...register("imageFiles", {
//                                 validate: (files) => {
//                                   // NOTE: files is a FileList or null/undefined
//                                   const newFilesCount = files ? files.length : 0;
//                                   const totalImages = existingImageUrls.length + newFilesCount;
                                  
//                                   if (totalImages === 0) return "Please upload at least one image";
                                  
//                                   if (totalImages > 6) return `Maximum 6 images allowed. You have ${existingImageUrls.length} existing images and selected ${newFilesCount} new files.`;
                                  
//                                   return true;
//                                 }
//                               })}
//                             />
//                           </label>
//                           <p className="text-sm text-slate-500 mt-2">
//                             Upload up to {6 - existingImageUrls.length} more images (Max 6 total).
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* File upload errors */}
//                     {errors.imageFiles && (
//                       <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                         <span>⚠</span>
//                         <span>{errors.imageFiles.message}</span>
//                       </p>
//                     )}

//                 <span className="flex justify-center items-center mb-3">
//                   <button
//                     disabled={isLoading}
//                     type="submit"
//                     className="bg-blue-600 hover:cursor-pointer text-white p-4 font-bold hover:bg-green-500 text-xl disabled:bg-gray-500"
//                   >
//                     {isLoading ? "Updating..." : "Update"}
//                   </button>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//         </div>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";
// 1. ADDED Imports for TanStack Query Hooks & Navigation
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { EditHotelById, upadteHotelBYId } from "../../Api"; // Assuming both API functions are here
import { AlertCircle } from "lucide-react";
import { AppContext } from "@/app/context/AppNotify"; 
import { useForm } from "react-hook-form";
import Link from "next/link";
import { hotelFacilities, hotelTypes } from "@/app/config/hotelOption"; 
import { useEffect } from "react"; 
import Image from "next/image";

export type addHotelTypes = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  description: string;
  type: string;
  facilities: string[];
  pricePerNight: number;
  imageUrls: string[]; 
  imageFiles: FileList; 
  roomStatus: string;
  lastUpdated: Date;
};

export default function EditHotelsById() {
  const params = useParams();
  const hotelId = params?.hotelId as string;
  const { isAdmin } = AppContext(); 

  const queryClient = useQueryClient(); // Initialize query client
  const router = useRouter(); // Initialize router

  // 1. Fetch Existing Data
  const {
    data: hotel,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => EditHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  // 2. Setup Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, 
    watch,
  } = useForm<addHotelTypes>();

  const existingImageUrls: string[] = watch("imageUrls") || [];

  // 3. Setup Mutation Hook (for PUT request)
  const updateMutation = useMutation({
    // Mutation function must match your API signature
    mutationFn: (formData: FormData) => upadteHotelBYId(hotelId, formData), 
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["hotel", hotelId] });
      // Redirect after successful update
      router.push("/dashboard"); 
    },
    onError: (error) => {
      console.error("Update failed:", error.message);
    },
  });

  const isUpdating = updateMutation.isPending; // ⬅️ USED for button disabling

  // Use useEffect to set default values when the hotel data is fetched
  useEffect(() => {
    if (hotel) {
      reset(hotel); 
    }
  }, [hotel, reset]); 

  // Handler for deleting an existing image
  const handleDeleteImage = (
    event: React.MouseEvent<HTMLButtonElement>,
    imageUrl: string
  ) => {
    event.preventDefault();
    const updatedImageUrls = existingImageUrls.filter(
      (url) => url !== imageUrl
    );
    setValue("imageUrls", updatedImageUrls, { shouldValidate: true });
  };


  if (isLoading) {
    return (
      <p className="text-center py-20 text-xl font-semibold">Loading hotel data for editing...</p>
    );
  }

  if (isError || !hotel) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Oops!</strong>
          <span className="block sm:inline ml-2">Hotel not found or an error occurred.</span>
        </div>
      </div>
    );
  }

  // 4. Final onSubmit Handler to construct and send FormData
  const onSubmit = handleSubmit((formDataJson: addHotelTypes) => {
    const formData = new FormData();

    // Append ALL form fields
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("roomStatus", formDataJson.roomStatus);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString()); 

    // Append facilities (should match backend array parsing)
    formDataJson.facilities.forEach((facility) => {
      formData.append(`facilities`, facility);
    });

    // Append existing, kept image URLs 
    formDataJson.imageUrls.forEach((url) => {
      formData.append("imageUrls", url); 
    });

    // Append new image files (for Multer)
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile); 
    });
    
    // Trigger the update request
    updateMutation.mutate(formData);
  });

  const roomStatusOptions = ["Available", "Booked", "Maintenance"];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don&apos;t have permission to view this dashboard.</p>
      </div>
    );
  }

  // --- JSX Rendering ---

  return (
    <div className="mt-8">
      <form onSubmit={onSubmit}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          
          {/* Header Section */}
          <div className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-slate-200/40">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
              <h1 className="text-lg underline sm:text-xl font-bold text-slate-800">Edit Room</h1>
              <Link href="/dashboard" className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-700 to-rose-600 px-4 py-2 text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all text-sm">Go to Dashboard</Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="divide-y divide-slate-100">
               {/* Basic Information Section */}
                 <div className="p-6 sm:p-8 lg:p-10">
                   {/* ... (Your Basic Info fields using register) ... */}
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">1</span></div>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Basic Information</h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            {/* Hotel Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Hotel Name <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Enter hotel name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400" {...register("name", { required: "Hotel name is required" })} />
                                {errors.name && (<p className="text-red-500 text-sm font-medium flex items-center space-x-1"><span>⚠</span><span>{errors.name.message}</span></p>)}
                            </div>
                            {/* City */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">City <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Enter city name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400" {...register("city", { required: "City is required" })} />
                                {errors.city && (<p className="text-red-500 text-sm font-medium flex items-center space-x-1"><span>⚠</span><span>{errors.city.message}</span></p>)}
                            </div>
                            {/* Rooms */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Room Status <span className="text-red-500">*</span></label>
                                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" {...register("roomStatus", { required: "Room status is required" })}>
                                    <option value="">Select room status</option>
                                    {roomStatusOptions.map((status) => (<option key={status} value={status}>{status}</option>))}
                                </select>
                                {errors.roomStatus && (<p className="text-red-500 text-sm font-medium flex items-center space-x-1"><span>⚠</span><span>{errors.roomStatus.message}</span></p>)}
                            </div>
                            {/* Description - Full Width */}
                            <div className="lg:col-span-2 space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Description <span className="text-red-500">*</span></label>
                                <textarea rows={4} placeholder="Describe your hotel's unique features, amenities, and what makes it special..." className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none" {...register("description", { required: "Description is required" })} />
                                {errors.description && (<p className="text-red-500 text-sm font-medium flex items-center space-x-1"><span>⚠</span><span>{errors.description.message}</span></p>)}
                            </div>
                            {/* Price */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Price per Night <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
                                    <input type="number" min="0" step="1" placeholder="0" className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400" {...register("pricePerNight", { required: "Price is required", min: { value: 1, message: "Price must be greater than 0" } })} />
                                </div>
                                {errors.pricePerNight && (<p className="text-red-500 text-sm font-medium flex items-center space-x-1"><span>⚠</span><span>{errors.pricePerNight.message}</span></p>)}
                            </div>
                        </div>
                   </div>

                {/* Hotel Type Section */}
{/*                 <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">2</span></div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Hotel Type</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {hotelTypes.map((type) => (
                      <label key={type} className="group cursor-pointer">
                        <div className="relative p-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-blue-300 group-hover:shadow-md has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md">
                          <input type="radio" value={type} className="sr-only" {...register("type", { required: "Please select a hotel type" })} />
                          <div className="text-center"><div className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">{type}</div></div>
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-slate-300 bg-white group-has-[:checked]:border-blue-500 group-has-[:checked]:bg-blue-500"><div className="w-2 h-2 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-has-[:checked]:opacity-100"></div></div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.type && (<p className="mt-4 text-red-500 text-sm font-medium flex items-center space-x-1"><span>⚠</span><span>{errors.type.message}</span></p>)}
                </div> */}
  <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                      Hotel Type
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {hotelTypes.map((type) => (
                      <label key={type} className="group cursor-pointer">
                        <div className="relative p-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-blue-300 group-hover:shadow-md has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md">
                          <input
                            type="radio"
                            value={type}
                            className="sr-only"
                            {...register("type", {
                              required: "Please select a hotel type",
                            })}
                          />
                          <div className="text-center">
                            <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                              {type}
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-slate-300 bg-white group-has-[:checked]:border-blue-500 group-has-[:checked]:bg-blue-500">
                            <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-has-[:checked]:opacity-100"></div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.type && (
                    <p className="mt-4 text-red-500 text-sm font-medium flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{errors.type.message}</span>
                    </p>
                  )}
                </div>

                {/* Facilities Section */}
{/*                 <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">3</span></div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Facilities & Amenities</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {hotelFacilities.map((facility) => (
                      <label key={facility} className="group cursor-pointer">
                        <div className="relative p-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-purple-300 group-hover:shadow-md has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50 has-[:checked]:shadow-md">
                          <input type="checkbox" value={facility} className="sr-only" {...register("facilities", { validate: (facilities) => { return facilities && facilities.length > 0 ? true : "Select at least one facility"; } })} />
                          <div className="text-center"><div className="text-sm font-semibold text-slate-700 group-hover:text-purple-600">{facility}</div></div>
                          <div className="absolute top-2 right-2 w-4 h-4 rounded border-2 border-slate-300 bg-white group-has-[:checked]:border-purple-500 group-has-[:checked]:bg-purple-500"><div className="w-2 h-2 text-white text-xs flex items-center justify-center opacity-0 group-has-[:checked]:opacity-100">✓</div></div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.facilities && (<p className="mt-4 text-red-500 text-sm font-medium flex items-center space-x-1"><span>⚠</span><span>{errors.facilities.message}</span></p>)}
                </div> */}
 <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                      Facilities & Amenities
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {hotelFacilities.map((facility) => (
                      <label key={facility} className="group cursor-pointer">
                        <div className="relative p-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-purple-300 group-hover:shadow-md has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50 has-[:checked]:shadow-md">
                          <input
                            type="checkbox"
                            value={facility}
                            className="sr-only"
                            {...register("facilities", {
                              validate: (facilities) => {
                                return facilities && facilities.length > 0
                                  ? true
                                  : "Select at least one facility";
                              },
                            })}
                          />
                          <div className="text-center">
                            <div className="text-sm font-semibold text-slate-700 group-hover:text-purple-600">
                              {facility}
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 w-4 h-4 rounded border-2 border-slate-300 bg-white group-has-[:checked]:border-purple-500 group-has-[:checked]:bg-purple-500">
                            <div className="w-2 h-2 text-white text-xs flex items-center justify-center opacity-0 group-has-[:checked]:opacity-100">
                              ✓
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.facilities && (
                    <p className="mt-4 text-red-500 text-sm font-medium flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{errors.facilities.message}</span>
                    </p>
                  )}
                </div>

                {/* -------------------- Images Section -------------------- */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">4</span></div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Hotel Images ({existingImageUrls.length}/6)</h2> 
                  </div>

                  <div className="space-y-4">
                    {/* 1. Display Existing Images */}
                    {existingImageUrls.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                        {existingImageUrls.map((url) => (
                          <div key={url} className="relative aspect-square overflow-hidden rounded-xl border border-slate-300 shadow-sm">
                            <Image src={url} alt="Existing Hotel Image" fill sizes="(max-width: 640px) 50vw, 16vw" className="object-cover" />
                            {/* Delete Button Overlay */}
                            <button onClick={(e) => handleDeleteImage(e, url)} className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10" type="button" >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* 2. Upload New Images Input */}
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-1 text-center bg-white/30 backdrop-blur-sm hover:border-rose-400 transition-colors duration-200">
                      <div className="space-y-4">
                        <div>
                          <label className="cursor-pointer">
                            <span className="text-lg font-semibold text-slate-700 hover:text-rose-600 transition-colors">Click to upload new images📷</span>
                            <input type="file" multiple accept="image/*" className="sr-only" 
                              {...register("imageFiles", { validate: (files) => {
                                  const newFilesCount = files ? files.length : 0;
                                  const totalImages = existingImageUrls.length + newFilesCount;
                                  if (totalImages === 0) return "Please upload at least one image";
                                  if (totalImages > 6) return `Maximum 6 images allowed. You have ${existingImageUrls.length} existing images and selected ${newFilesCount} new files.`;
                                  return true;
                                }
                              })}
                            />
                          </label>
                          <p className="text-sm text-slate-500 mt-2">Upload up to {6 - existingImageUrls.length} more images (Max 6 total).</p>
                        </div>
                      </div>
                    </div>

                    {/* File upload errors */}
                    {errors.imageFiles && (<p className="text-red-500 text-sm font-medium flex items-center space-x-1"><span>⚠</span><span>{errors.imageFiles.message}</span></p>)}
                  </div>
                </div>
                {/* -------------------- END Images Section -------------------- */}

                <span className="flex justify-center items-center mb-3">
                  <button
                    disabled={isLoading || isUpdating}
                    type="submit"
                    className="bg-blue-600 hover:cursor-pointer text-white p-4 font-bold hover:bg-green-500 text-xl disabled:bg-gray-500"
                  >
                    {isLoading ? "Loading..." : isUpdating ? "Updating..." : "Update"}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}