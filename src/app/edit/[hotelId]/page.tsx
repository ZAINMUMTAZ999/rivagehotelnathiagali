// "use client";
// import {  useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import {  EditHotelById } from "../../Api";
// // import AddHotel from "../../components/AddHotel";
// import { AlertCircle } from "lucide-react";
// import { AppContext } from "@/app/context/AppNotify";
// import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { hotelFacilities, hotelTypes } from "@/app/config/hotelOption";
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

// export default function  EditHotelsById  () 
//   {

//     const params = useParams();
//     const hotelId = params?.hotelId as string; // safely cast to string
// // const navigate= useRouter();
// const {isAdmin}=AppContext();
 
//   const { register, handleSubmit, formState: { errors } } = useForm<addHotelTypes>();


//     const {
//       data: hotel,
//       isLoading,
//       isError,
//     } = useQuery({
//         queryKey: ["hotel", hotelId],

//       queryFn: () => EditHotelById(hotelId || ""),
//       enabled: !!hotelId,
//     });
//     console.log("hotel",hotel)
//     if(!hotel){
//         return(
//             <>hotel not found</>
//         )
//     }
    
//     console.log("editHotel", hotel);


//     if (isLoading) {
//       return (
//  <div className="mt-8 space-y-6">
//       {/* Header bar */}
//         <div className="relative w-full">
//       {/* Main Image Container */}
//       <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-200 animate-pulse">
//         {/* Left arrow placeholder */}
//         <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-300 rounded-full shadow-md" />
//         {/* Right arrow placeholder */}
//         <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-300 rounded-full shadow-md" />
//         {/* Image counter placeholder */}
//         <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gray-300" />
//       </div>

//       {/* Thumbnail Navigation */}
//       <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
//         {Array.from({ length: 5 }).map((_, idx) => (
//           <div
//             key={idx}
//             className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-300 border-2 border-gray-200 animate-pulse"
//           />
//         ))}
//       </div>
//     </div>
//       <div className="bg-white/70 backdrop-blur-md border-b border-slate-200/40">
//         <div className="flex items-center justify-between px-4 py-4">
//           <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />
//           <div className="h-8 w-28 bg-gray-300 rounded-xl animate-pulse" />
//         </div>
//       </div>

//       {/* Location + price */}
//       <div className="flex justify-between px-4">
//         <div className="h-5 w-32 bg-gray-300 rounded animate-pulse" />
//         <div className="flex items-center space-x-2">
//           <div className="h-6 w-12 bg-gray-300 rounded animate-pulse" />
//           <div className="h-6 w-20 bg-gray-300 rounded animate-pulse" />
//         </div>
//       </div>

//       {/* Big card */}
//       <div className="bg-white rounded-lg shadow-xl overflow-hidden p-6 space-y-6">
//         {/* Book button */}
//         <div className="h-12 w-full bg-gray-300 rounded-lg animate-pulse" />

//         {/* Hotel type */}
//         <div className="h-5 w-32 bg-gray-300 rounded animate-pulse" />

//         {/* Description */}
//         <div className="space-y-2">
//           <div className="h-6 w-24 bg-gray-300 rounded animate-pulse" />
//           <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
//           <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
//           <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
//         </div>

//         {/* Room status */}
//         <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />

//         {/* Facilities */}
//         <div className="space-y-3">
//           <div className="h-6 w-28 bg-gray-300 rounded animate-pulse" />
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="h-8 w-full bg-gray-200 rounded-md animate-pulse"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Add review button */}
//         <div className="h-10 w-40 bg-gray-300 rounded-lg animate-pulse" />
//       </div>

//       {/* Map section */}
//       <section className="bg-white py-12 md:py-16 border-t border-gray-200">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="h-8 w-48 bg-gray-300 mx-auto rounded animate-pulse mb-8" />
//           <div className="relative w-full h-96 md:h-[450px] rounded-lg bg-gray-300 animate-pulse" />
//         </div>
//       </section>
//     </div>
       
//       );
//     }

//     if (isError ) {
//       return (
//         <div className="container mx-auto px-4 py-8 mt-24 text-center">
//           <div
//             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//             role="alert"
//           >
//             <strong className="font-bold">Oops!</strong>
//             <span className="block sm:inline ml-2">
//               Hotel not found or an error occurred.
//             </span>
//           </div>
//         </div>
//       );
//     }
//    const onSubmit = handleSubmit((formDataJson: addHotelTypes) => {
//     const formData = new FormData();
  
//     formData.append("name", formDataJson.name);
//     formData.append("city", formDataJson.city);
//     // formData.append("country", formDataJson.country);
//     formData.append("description", formDataJson.description);
//     formData.append("type", formDataJson.type);
//     formData.append("roomStatus", formDataJson.roomStatus);
//     formData.append("pricePerNight", formDataJson.pricePerNight.toString());
//     // formData.append("starRating", formDataJson.starRating.toString());
//     // formData.append("adultCount", formDataJson.adultCount.toString());
//     // formData.append("childCount", formDataJson.childCount.toString());

//     formDataJson.facilities.forEach((facility, index) => {
//       formData.append(`facilities[${index}]`, facility);
//     });

//     if (formDataJson.imageUrls) {
//       formDataJson.imageUrls.forEach((url, index) => {
//         formData.append(`imageUrls[${index}]`, url);
//       });
//     }

//     Array.from(formDataJson.imageFiles).forEach((imageFile) => {
//       formData.append("imageFiles", imageFile);
//     });

//   // apiMutate(formData);
//   });
// const roomStatusOptions = ["Available","Booked","Maintenance"];

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
//           <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">
//             Access Denied
//           </h2>
//           <p className="text-gray-600">
//             You don&apos;t have permission to view this dashboard.
//           </p>
//         </div>
//       </div>
//     );
//   }
 

//     return (
//       // <div className="container mx-auto px-4 py-8 mt-24 mb-10">
//       <div className="mt-8">
        
   
     
//          <form  onSubmit={onSubmit} >
//     <div className="min-h-screen   bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header Section */}
//    <div className="sticky  top-0 z-20 bg-white/70 backdrop-blur-md border-b border-slate-200/40">
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
//           <h1 className="text-lg underline sm:text-xl font-bold text-slate-800">
//             Add Room
//           </h1>
//           <Link
//             href="/dashboard"
//             className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-700 to-rose-600 px-4 py-2 text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all text-sm" 
//           >
//             Go to Dashboard 
//           </Link>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//         <div className="bg-white/70 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
//           <div className="divide-y divide-slate-100">
            
//             {/* Basic Information Section */}
//             <div className="p-6 sm:p-8 lg:p-10">
//               <div className="flex items-center space-x-3 mb-8">
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">1</span>
//                 </div>
//                 <h2 className="text-xl md:text-2xl font-bold text-slate-800">Basic Information</h2>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//                 {/* Hotel Name */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-slate-700">
//                     Hotel Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter hotel name"
//                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
//                     {...register("name", { required: "Hotel name is required" })}
//                   />
//                   {errors.name && (
//                     <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                       <span>⚠</span>
//                       <span>{errors.name.message}</span>
//                     </p>
//                   )}
//                 </div>

//                 {/* City */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-slate-700">
//                     City <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter city name"
//                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
//                     {...register("city", { required: "City is required" })}
//                   />
//                   {errors.city && (
//                     <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                       <span>⚠</span>
//                       <span>{errors.city.message}</span>
//                     </p>
//                   )}
//                 </div>
// {/* Rooms  */}

//   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-slate-700">
//                       Room Status <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       {...register("roomStatus", { required: "Room status is required" })}
//                     >
//                       <option value="">Select room status</option>
//                       {roomStatusOptions.map((status) => (
//                         <option key={status} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.roomStatus && (
//                       <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                         <span>⚠</span>
//                         <span>{errors.roomStatus.message}</span>
//                       </p>
//                     )}
//                   </div>

//                 {/* Description - Full Width */}
//                 <div className="lg:col-span-2 space-y-2">
//                   <label className="block text-sm font-semibold text-slate-700">
//                     Description <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     rows={4}
//                     placeholder="Describe your hotel's unique features, amenities, and what makes it special..."
//                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none"
//                     {...register("description", { required: "Description is required" })}
//                   />
//                   {errors.description && (
//                     <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                       <span>⚠</span>
//                       <span>{errors.description.message}</span>
//                     </p>
//                   )}
//                 </div>

//                 {/* Price */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-slate-700">
//                     Price per Night <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
//                     <input
//                       type="number"
//                       min="0"
//                       step="1"
//                       placeholder="0"
//                       className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
//                       {...register("pricePerNight", { 
//                         required: "Price is required",
//                         min: { value: 1, message: "Price must be greater than 0" }
//                       })}
//                     />
//                   </div>
//                   {errors.pricePerNight && (
//                     <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
//                       <span>⚠</span>
//                       <span>{errors.pricePerNight.message}</span>
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Hotel Type Section */}
//             <div className="p-6 sm:p-8 lg:p-10">
//               <div className="flex items-center space-x-3 mb-8">
//                 <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">2</span>
//                 </div>
//                 <h2 className="text-xl md:text-2xl font-bold text-slate-800">Hotel Type</h2>
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//                 {hotelTypes.map((type) => (
//                   <label key={type} className="group cursor-pointer">
//                     <div className="relative p-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-blue-300 group-hover:shadow-md has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md">
//                       <input
//                         type="radio"
//                         value={type}
//                         className="sr-only"
//                         {...register("type", { required: "Please select a hotel type" })}
//                       />
//                       <div className="text-center">
//                         <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
//                           {type}
//                         </div>
//                       </div>
//                       <div className="absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-slate-300 bg-white group-has-[:checked]:border-blue-500 group-has-[:checked]:bg-blue-500">
//                         <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-has-[:checked]:opacity-100"></div>
//                       </div>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//               {errors.type && (
//                 <p className="mt-4 text-red-500 text-sm font-medium flex items-center space-x-1">
//                   <span>⚠</span>
//                   <span>{errors.type.message}</span>
//                 </p>
//               )}
//             </div>

//             {/* Facilities Section */}
//             <div className="p-6 sm:p-8 lg:p-10">
//               <div className="flex items-center space-x-3 mb-8">
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">3</span>
//                 </div>
//                 <h2 className="text-xl md:text-2xl font-bold text-slate-800">Facilities & Amenities</h2>
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {hotelFacilities.map((facility) => (
//                   <label key={facility} className="group cursor-pointer">
//                     <div className="relative p-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-purple-300 group-hover:shadow-md has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50 has-[:checked]:shadow-md">
//                       <input
//                         type="checkbox"
//                         value={facility}
//                         className="sr-only"
//                         {...register("facilities", {
//                           validate: (facilities) => {
//                             return facilities && facilities.length > 0 ? true : "Select at least one facility";
//                           },
//                         })}
//                       />
//                       <div className="text-center">
//                         <div className="text-sm font-semibold text-slate-700 group-hover:text-purple-600">
//                           {facility}
//                         </div>
//                       </div>
//                       <div className="absolute top-2 right-2 w-4 h-4 rounded border-2 border-slate-300 bg-white group-has-[:checked]:border-purple-500 group-has-[:checked]:bg-purple-500">
//                         <div className="w-2 h-2 text-white text-xs flex items-center justify-center opacity-0 group-has-[:checked]:opacity-100">✓</div>
//                       </div>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//               {errors.facilities && (
//                 <p className="mt-4 text-red-500 text-sm font-medium flex items-center space-x-1">
//                   <span>⚠</span>
//                   <span>{errors.facilities.message}</span>
//                 </p>
//               )}
//             </div>

//             {/* Images Section */}
//             <div className="p-6 sm:p-8 lg:p-10">
//               <div className="flex items-center space-x-3 mb-8">
//                 <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">4</span>
//                 </div>
//                 <h2 className="text-xl md:text-2xl font-bold text-slate-800">Hotel Images</h2>
//               </div>

//               <div className="space-y-4">
//                 <div className="border-2 border-dashed border-slate-300 rounded-xl p-1 text-center bg-white/30 backdrop-blur-sm hover:border-rose-400 transition-colors duration-200">
//                   <div className="space-y-4">
//                     {/* <div className="w-16 h-16 mx-auto bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-2xl">📷</span>
//                     </div> */}
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
//             </div>

           
//               <span className="flex justify-center items-center mb-3">
//           <button
//             disabled={isLoading}
//             type="submit"
//             className="bg-blue-600 hover:cursor-pointer text-white p-4 font-bold hover:bg-green-500 text-xl disabled:bg-gray-500"
//           >
//             {isLoading ? "Saving..." : "Save"}
//           </button>
//         </span>
//           </div>
//         </div>
//       </div>
//     </div>
//     </form>
     
     

//       </div>
//     );
//   };
"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { EditHotelById } from "../../Api"; // Assuming this is correct
// import { AlertCircle } from "lucide-react";
import { AppContext } from "@/app/context/AppNotify"; // Assuming this is correct
import { useForm } from "react-hook-form";
import Link from "next/link";
import { hotelFacilities, hotelTypes } from "@/app/config/hotelOption"; // Assuming this is correct
import { useEffect } from "react"; // ⬅️ NEW: Import useEffect

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
  const { isAdmin } = AppContext(); // Assuming AppContext returns {isAdmin: boolean}

  const {
    data: hotel,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => EditHotelById(hotelId || ""),
    enabled: !!hotelId,
  });
  
  // 1. Initialize useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // ⬅️ IMPORTANT: Get the reset function
  } = useForm<addHotelTypes>();

  // 2. Use useEffect to set default values when the hotel data is fetched
  useEffect(() => {
    if (hotel) {
      // This will pre-populate the form fields with the fetched data
      // provided the field names (e.g., 'name', 'city') match the keys in the 'hotel' object.
      // NOTE: `pricePerNight` needs to be a number, make sure your API returns it as such.
      reset(hotel);
    }
  }, [hotel, reset]); // Dependency on 'hotel' ensures it runs after data is available

  console.log("hotel", hotel);
  
  // ... (Your existing loading, error, and access denied states)

  if (isLoading) {
    return (
      <p>Loading hotel data for editing...</p> // Simplified loading state
      // Use your existing loading JSX if preferred
    );
  }

  if (isError || !hotel) { // Check !hotel here
    return (
      <div className="container mx-auto px-4 py-8 mt-24 text-center">
        {/* ... (Your error JSX) */}
      </div>
    );
  }

  const onSubmit = handleSubmit((formDataJson: addHotelTypes) => {
    // ... (Your submission logic for the form data)
    console.log("Form Submitted with:", formDataJson);
    // You would call your update API mutation here
  });

  const roomStatusOptions = ["Available", "Booked", "Maintenance"];

  if (!isAdmin) {
    // ... (Your access denied JSX)
  }

  return (
    // ... (Your JSX form structure remains the same)
    // The key is that `register` is now connected to `defaultValues` set by `reset(hotel)`
    <div className="mt-8">
    
          <form  onSubmit={onSubmit} >
     <div className="min-h-screen   bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
       {/* Header Section */}
    <div className="sticky  top-0 z-20 bg-white/70 backdrop-blur-md border-b border-slate-200/40">
         <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
           <h1 className="text-lg underline sm:text-xl font-bold text-slate-800">
             Add Room
           </h1>
           <Link
            href="/dashboard"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-700 to-rose-600 px-4 py-2 text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all text-sm" 
          >
            Go to Dashboard 
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="divide-y divide-slate-100">
            
            {/* Basic Information Section */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Hotel Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Hotel Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter hotel name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    {...register("name", { required: "Hotel name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{errors.name.message}</span>
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    {...register("city", { required: "City is required" })}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{errors.city.message}</span>
                    </p>
                  )}
                </div>
{/* Rooms  */}

  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Room Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      {...register("roomStatus", { required: "Room status is required" })}
                    >
                      <option value="">Select room status</option>
                      {roomStatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    {errors.roomStatus && (
                      <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
                        <span>⚠</span>
                        <span>{errors.roomStatus.message}</span>
                      </p>
                    )}
                  </div>

                {/* Description - Full Width */}
                <div className="lg:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your hotel's unique features, amenities, and what makes it special..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none"
                    {...register("description", { required: "Description is required" })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{errors.description.message}</span>
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Price per Night <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                      {...register("pricePerNight", { 
                        required: "Price is required",
                        min: { value: 1, message: "Price must be greater than 0" }
                      })}
                    />
                  </div>
                  {errors.pricePerNight && (
                    <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
                      <span>⚠</span>
                      <span>{errors.pricePerNight.message}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Hotel Type Section */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Hotel Type</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {hotelTypes.map((type) => (
                  <label key={type} className="group cursor-pointer">
                    <div className="relative p-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200 group-hover:border-blue-300 group-hover:shadow-md has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md">
                      <input
                        type="radio"
                        value={type}
                        className="sr-only"
                        {...register("type", { required: "Please select a hotel type" })}
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
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Facilities & Amenities</h2>
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
                            return facilities && facilities.length > 0 ? true : "Select at least one facility";
                          },
                        })}
                      />
                      <div className="text-center">
                        <div className="text-sm font-semibold text-slate-700 group-hover:text-purple-600">
                          {facility}
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 w-4 h-4 rounded border-2 border-slate-300 bg-white group-has-[:checked]:border-purple-500 group-has-[:checked]:bg-purple-500">
                        <div className="w-2 h-2 text-white text-xs flex items-center justify-center opacity-0 group-has-[:checked]:opacity-100">✓</div>
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

            {/* Images Section */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Hotel Images</h2>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-1 text-center bg-white/30 backdrop-blur-sm hover:border-rose-400 transition-colors duration-200">
                  <div className="space-y-4">
                    {/* <div className="w-16 h-16 mx-auto bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">📷</span>
                    </div> */}
                    <div>
                      <label className="cursor-pointer">
                        <span className="text-lg font-semibold text-slate-700 hover:text-rose-600 transition-colors">
                          Click to upload images📷
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          {...register("imageFiles", {
                            validate: (files) => {
                              if (!files || files.length === 0) return "Please select at least one image";
                              if (files.length > 6) return "Maximum 6 images allowed";
                              return true;
                            }
                          })}
                        />
                      </label>
                      <p className="text-sm text-slate-500 mt-2">
                        Upload 1-6 high-quality images (JPG, PNG, WebP)
                      </p>
                    </div>
                  </div>
                </div>
                {errors.imageFiles && (
                <p className="text-red-500 text-sm font-medium flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.imageFiles.message}</span>
                </p>
              )}
              </div>
            </div>

           
              <span className="flex justify-center items-center mb-3">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 hover:cursor-pointer text-white p-4 font-bold hover:bg-green-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Updating..." : "Update"}
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