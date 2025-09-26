// "use client";
// import {
//   FaMapMarkerAlt,
//   //   FaDollarSign,
//   FaBed,
// } from "react-icons/fa";
// // import { AppContext } from "../context/AppNotify";
// // import { useParams } from "next/navigation";
// // import { useQuery } from "@tanstack/react-query";
// // import { getHotelApiBId } from "../Api";
// import Image from "next/image";

// export type addHotelTypes = {
//   _id: string;
//   userId: string;
//   name: string;
//   city: string;

//   description: string;
//   type: string;
//   // adultCount: number;
//   // childCount: number;
//   facilities: string[];
//   pricePerNight: number;
//   // starRating: number;
//   imageUrls: string[];
//   imageFiles: FileList;
//   roomStatus: string;
//   lastUpdated: Date;
// };

// // interface AppContextType {
// //   showToast: (params: { message: string; type: string }) => void;
// // }
// type MyHotelsByIdProps = {
//   hotel: addHotelTypes;
// };
// const MyHotelsById = ({ hotel }: MyHotelsByIdProps) => {
//   //   const { showToast } = AppContext() as AppContextType;
//   //   const { hotelId } = useParams<{ hotelId: string }>();
//   // hotel
//   //   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   //  const {data:hotelById,isLoading,isError} = useQuery({
//   //   queryKey: ["getHotelApiById", hotelId],
//   //   queryFn: () => getHotelApiBId(hotelId || ""),
//   //   enabled: !!hotelId,
//   // //   onError: (error: unknown) => {
//   // //     showToast({ message: "Failed to load hotel details.", type: "ERROR" });
//   // //     console.error("Error fetching hotel:", error);
//   // //   },
//   //   // Optional: you can type the data like this
//   //   // select: (data: addHotelTypes) => data, // if you want to transform data
//   // });
//   // console.log(hotelById)
//   //   if (isLoading) {
//   //     return (
//   //       <div className="container mx-auto px-4 py-8 mt-24 animate-pulse">
//   //         <div className="bg-white p-6 rounded-lg shadow-md">
//   //           <div className="h-96 bg-gray-200 rounded-md mb-4"></div>
//   //           <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4"></div>
//   //           <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-4"></div>
//   //           <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
//   //           <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-2"></div>
//   //           <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
//   //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
//   //             {[...Array(6)].map((_, i) => (
//   //               <div key={i} className="h-12 bg-gray-200 rounded-md"></div>
//   //             ))}
//   //           </div>
//   //         </div>
//   //       </div>
//   //     );
//   //   }

//   //   if (isError
//   //     //  || !hotelById
//   //     ) {
//   //     return (
//   //       <div className="container mx-auto px-4 py-8 mt-24 text-center">
//   //         <div
//   //           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//   //           role="alert"
//   //         >
//   //           <strong className="font-bold">Oops!</strong>
//   //           <span className="block sm:inline ml-2">
//   //             Hotel not found or an error occurred.
//   //           </span>
//   //         </div>
//   //       </div>
//   //     );
//   //   }

//   const images: string[] = hotel?.imageUrls || [];
//   const hasSingleImage = images.length === 1;

//   return (
//     <div className="container mx-auto px-4 py-8 mt-24 mb-10">
//       <div className="bg-white rounded-lg shadow-xl overflow-hidden">
//         <div className="p-6 md:p-8">
//           {/* Images Section */}
//           {images.length > 0 && (
//             <div className="mb-8">
//               <div
//               // className={
//               //   hasSingleImage
//               //     ? "w-full" // Full width for single image
//               //     : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" // Grid for multiple images
//               // }
//               >
//                 {/* {images.map((pic, index) => (
//                   <div
//                     key={index}
//                     className={` flex flex-row  rounded-lg shadow-md group cursor-pointer ${
//                       hasSingleImage
//                         ? "w-1/2 h-[400px] sm:h-[500px] lg:h-[600px]" // Larger fixed height for single image on various screen sizes
//                         : "w-1/2 h-60" // Original fixed height for grid items
//                     }`}
//                     // onClick={() => setSelectedImage(pic)}
//                   >
//                     <Image
//                       src={pic}
//                       fill
//                       //              width={500}
//                       // height={500}
//                       unoptimized={true}
//                       //   alt={`Hotel room image ${index + 1}`}
//                       alt="image"
//                       className=" object-cover  transform transition-transform duration-300 group-hover:scale-105"
//                     />
//                     <div
//                       className="
                    
                    
//                     absolute inset-0 bg-transparent bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     >
//                       <span
//                         className=" text-gray-300 font-extrabold tracking-tight
//       text-xl sm:text-lg md:text-3xl lg:text-3xl
//       leading-snug"
//                       >
//                         View Image
//                       </span>
//                     </div>
//                   </div>
//                 ))} */}
//                 <HotelImageSlider hotel={hotel.imageUrls}/>
//               </div>
//             </div>
//           )}

//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
//                 {hotel?.name}
//               </h1>
//               <p className="text-lg text-gray-600 flex items-center mt-1">
//                 <FaMapMarkerAlt className="mr-2 text-red-500" />
//                 {hotel?.city}
//               </p>
//               <p className="text-md text-gray-500 mt-1">
//                 <span className="font-semibold">{hotel?.type}</span> Hotel
//               </p>
//             </div>
//             <div className="text-right sm:text-left">
//               <p className="text-4xl font-bold text-green-600 flex items-center justify-end sm:justify-start">
//                 {/* <FaDollarSign className="text-3xl" /> */}
//                 PKR : {hotel?.pricePerNight}
//               </p>
//               <p className="text-sm text-gray-500">per night</p>
//             </div>
//           </div>

//           <hr className="my-6 border-gray-200" />

//           {/* Description */}
//           {hotel?.description && (
//             <div className="mb-6">
//               <h2 className="text-2xl font-semibold text-gray-700 mb-3">
//                 About this Hotel
//               </h2>
//               <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//                 {hotel?.description}
//               </p>
//             </div>
//           )}

//           {/* Room Status/Count */}
//           {hotel?.roomStatus && (
//             <div className="mb-6">
//               <p className="text-green-600 flex items-center">
//                 <FaBed className="mr-2 text-blue-500" size={32} />
//                 Room Status:
//                 <span className=" font-extrabold font-xl ml-2">
//                   {hotel.roomStatus}
//                 </span>
//               </p>
//             </div>
//           )}

//           {/* Facilities */}
//           {hotel?.facilities && hotel.facilities.length > 0 && (
//             <div className="mb-6">
//               <h2 className="text-2xl font-semibold text-gray-700 mb-3">
//                 Facilities
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {hotel?.facilities?.map((facility, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200"
//                   >
//                     <span className="text-md font-medium">{facility}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Last Updated */}
//           {hotel?.lastUpdated && (
//             <div className="mt-8 text-sm text-gray-500 text-right">
//               Last updated: {new Date(hotel.lastUpdated).toLocaleDateString()}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* {selectedImage && (
//         <ImageModal
//           imageUrl={selectedImage}
//           onClose={() => setSelectedImage(null)}
//         />
//       )} */}
//     </div>
//   );
// };

// export default MyHotelsById;


"use client";
import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaBed,
} from "react-icons/fa";
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

type MyHotelsByIdProps = {
  hotel: addHotelTypes;
};

const MyHotelsById = ({ hotel }: MyHotelsByIdProps) => {
  // Slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [showModal, setShowModal] = useState(false);

  const images: string[] = hotel?.imageUrls || [];

  // Slider functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // const openModal = () => {
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  // Handle keyboard navigation in modal
  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Escape') closeModal();
  //   if (e.key === 'ArrowLeft') goToPrevious();
  //   if (e.key === 'ArrowRight') goToNext();
  // };

  // Image Slider Component (built-in)
  const ImageSlider = () => {
    if (!images || images.length === 0) {
      return (
        <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
          <div className="text-center text-gray-500">
            <p className="text-lg">No images available</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Main Image Container */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg group">
            <Image
              src={images[currentIndex]}
              alt={`Hotel image ${currentIndex + 1}`}
              fill
              className="object-cover cursor-pointer"
              // onClick={openModal}
              unoptimized={true}
            />
            
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-gray-500 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                 onClick={openModal}>
              <span className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">
                View Full Size
              </span>
            </div> */}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800 hover:cursor-pointer" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800 hover:cursor-pointer" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                    index === currentIndex 
                      ? 'border-blue-500 opacity-100' 
                      : 'border-gray-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Dot Indicators (for fewer images) */}
          {images.length > 1 && images.length <= 5 && (
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Full Screen Modal */}
        {/* {showModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
               <div className="relative h-[80vh] w-full">
                <Image
                  src={images[currentIndex]}
                  alt={`Hotel image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div> 
              
              {/* Close button */}
             {/* <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10"
              >
                <X size={24} />
              </button> */}

              {/* Modal Navigation */}
              {/* {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )} */}

              {/* Modal Counter */}
              {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                {currentIndex + 1} / {images.length}
              </div> */}
            {/* </div> */}
          {/* </div> */}
        {/* )} */} 
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-24 mb-10">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Images Section with Built-in Slider */}
          {images.length > 0 && (
            <div className="mb-8">
              <ImageSlider />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
                {hotel?.name}
              </h1>
              <p className="text-lg text-gray-600 flex items-center mt-1">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {hotel?.city}
              </p>
              <p className="text-md text-gray-500 mt-1">
                <span className="font-semibold">{hotel?.type}</span> Hotel
              </p>
            </div>
            <div className="text-right sm:text-left">
              <p className="text-4xl font-bold text-green-600 flex items-center justify-end sm:justify-start">
                PKR : {hotel?.pricePerNight}
              </p>
              <p className="text-sm text-gray-500">per night</p>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Description */}
          {hotel?.description && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                About this Hotel
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {hotel?.description}
              </p>
            </div>
          )}

          {/* Room Status/Count */}
          {hotel?.roomStatus && (
            <div className="mb-6">
              <p className="text-green-600 flex items-center">
                <FaBed className="mr-2 text-blue-500" size={32} />
                Room Status:
                <span className=" font-extrabold font-xl ml-2">
                  {hotel.roomStatus}
                </span>
              </p>
            </div>
          )}

          {/* Facilities */}
          {hotel?.facilities && hotel.facilities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {hotel?.facilities?.map((facility, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <span className="text-md font-medium">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last Updated */}
          {hotel?.lastUpdated && (
            <div className="mt-8 text-sm text-gray-500 text-right">
              Last updated: {new Date(hotel.lastUpdated).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyHotelsById;