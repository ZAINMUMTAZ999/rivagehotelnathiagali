"use client"
import { AddHotelApi } from "../Api";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
// import { addHotelTypes } from "../../../backend/src/models/addHotel.models";
import { hotelFacilities, hotelTypes } from "../config/hotelOption";
import { AppContext } from "../context/AppNotify";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useRouter } from "next/";

// import { useNavigate } from "react-router-dom";

export type addHotelTypes = {
  _id: string;
  userId: string;
  name: string;
  city: string;
 
  description: string;
  type: string;
  // adultCount: number;
  // childCount: number;
  facilities: string[];
  pricePerNight: number;
  // starRating: number;
  imageUrls: string[];
imageFiles: FileList;
roomStatus:string,
  lastUpdated: Date;

};

// Main App component to encapsulate the form
const AddHotel: React.FC = () => {
  const {showToast}=AppContext();
const navigate= useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<addHotelTypes>();
  const {mutate: apiMutate, isPending:isLoading} = useMutation(
    {

      mutationFn: AddHotelApi,
       onSuccess: async () => {
      showToast({ type: "SUCCESS", message: "Room Added" });
 
      // await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      
      navigate.push("/allrooms");
    },
    onError: (error:Error) => {
      showToast({ type: "ERROR", message: error?.message });

    },
    }
    
    // "addHotel",
    // AddHotelApi,
   
    
  );
   const onSubmit = handleSubmit((formDataJson: addHotelTypes) => {
    const formData = new FormData();
  
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    // formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("roomStatus", formDataJson.roomStatus);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    // formData.append("starRating", formDataJson.starRating.toString());
    // formData.append("adultCount", formDataJson.adultCount.toString());
    // formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

  apiMutate(formData);
  });
const roomStatusOptions = ["Available","Booked","Maintenance"]
  return (
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
            className="bg-blue-600 text-white p-4 font-bold hover:bg-green-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
          </div>
        </div>
      </div>
    </div>
    </form>

  );
};

export default AddHotel;
// import { AppContext } from "@/context/AppNotify";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { addHotelTypes } from "../../../backend/src/models/addHotel.models";
// import { useMutation } from "react-query";
// import { AddHotelApi } from "@/Api";
// import { hotelFacilities, hotelTypes } from "@/config/hotel-options-config.ts";



// const AddHotel: React.FC = () => {
//   const {showToast}=AppContext();
//   const { register, handleSubmit, formState: { errors } } = useForm<addHotelTypes>();
//   const {mutate: apiMutate, isLoading} = useMutation(
//     "addHotel",
//     AddHotelApi,
//     {
//       onSuccess: () => {
//         // console.log("hotel added");
//         showToast({type:"SUCCESS",message:"Hotel Added!"})
//       },
//       onError: (error: Error) => {
//         // console.log(error.message);
//         showToast({type:"ERROR",message:error?.message})
//       },
//     }
//   );
//    const onSubmitHotel = handleSubmit((formDataJson: addHotelTypes) => {
//     const formData = new FormData();
  
//     formData.append("name", formDataJson.name);
//     formData.append("city", formDataJson.city);
//     // formData.append("country", formDataJson.country);
//     formData.append("description", formDataJson.description);
//     formData.append("type", formDataJson.type);
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

//   apiMutate(formData);
//   });

//   return (
//     <form  onSubmit={onSubmitHotel} >
//     <div className="min-h-screen  mt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header Section */}
//       <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="text-center">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Add New Hotel
//             </h1>
//             <p className="mt-2 text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
//               Create a stunning hotel listing with detailed information and high-quality images
//             </p>
//           </div>
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
//                 <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-white/30 backdrop-blur-sm hover:border-rose-400 transition-colors duration-200">
//                   <div className="space-y-4">
//                     <div className="w-16 h-16 mx-auto bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-2xl">📷</span>
//                     </div>
//                     <div>
//                       <label className="cursor-pointer">
//                         <span className="text-lg font-semibold text-slate-700 hover:text-rose-600 transition-colors">
//                           Click to upload images
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

//             {/* Submit Section */}
//             <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-slate-50 to-blue-50">
//               <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
//                 <div className="text-sm text-slate-600">
//                   <span className="font-medium">Almost done!</span> Review your information and submit.
//                 </div>
//                 <button
//                   type="button"
//                   // onClick={handleSubmit(onSubmit)}
//                   disabled={isLoading}
//                   className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-200 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center space-x-2">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       <span>Creating Hotel...</span>
//                     </span>
//                   ) : (
//                     <span className="flex items-center space-x-2">
//                       <span>Create Hotel</span>
//                       <span>✨</span>
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </form>
//   );
// };

// export default AddHotel;