"use client";
import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";

import {
  FaMapMarkerAlt,
  //   FaDollarSign,
  FaBed,
} from "react-icons/fa";

// import { getHotelApiBId } from "../../Api";
// import { AppContext } from "@/context/AppNotify";
import Image from "next/image";
// import { useParams } from "next/navigation";
import Link from "next/link";
// import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { GetEachHotelReviewId } from "../../components/GetEachHotelReviewId";
import { useParams } from "next/navigation";
import { EditHotelById } from "../../Api";
// import WhatsAppLinkButton from "../../components/WA";
// import AddReviewById from "../[id]/add-review/page";
// import { AddReviewEachId } from "../../components/AddReviewEachId";

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

export default function  EditHotelsById  () 
  {
    
    const [currentIndex, setCurrentIndex] = useState(0);
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
 
const params = useParams();
const hotelId = params?.hotelId as string; // safely cast to string


    const {
      data: hotel,
      isLoading,
      isError,
    } = useQuery({
        queryKey: ["hotel", hotelId],

      queryFn: () => EditHotelById(hotelId || ""),
      enabled: !!hotelId,
    });
    console.log("hotel",hotel)
    if(!hotel){
        return(
            <>hotel not found</>
        )
    }
    
    console.log("editHotel", hotel);

    if (isLoading) {
      return (
 <div className="mt-8 space-y-6">
      {/* Header bar */}
        <div className="relative w-full">
      {/* Main Image Container */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-200 animate-pulse">
        {/* Left arrow placeholder */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-300 rounded-full shadow-md" />
        {/* Right arrow placeholder */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-300 rounded-full shadow-md" />
        {/* Image counter placeholder */}
        <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gray-300" />
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-300 border-2 border-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
      <div className="bg-white/70 backdrop-blur-md border-b border-slate-200/40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />
          <div className="h-8 w-28 bg-gray-300 rounded-xl animate-pulse" />
        </div>
      </div>

      {/* Location + price */}
      <div className="flex justify-between px-4">
        <div className="h-5 w-32 bg-gray-300 rounded animate-pulse" />
        <div className="flex items-center space-x-2">
          <div className="h-6 w-12 bg-gray-300 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>

      {/* Big card */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden p-6 space-y-6">
        {/* Book button */}
        <div className="h-12 w-full bg-gray-300 rounded-lg animate-pulse" />

        {/* Hotel type */}
        <div className="h-5 w-32 bg-gray-300 rounded animate-pulse" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-6 w-24 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Room status */}
        <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />

        {/* Facilities */}
        <div className="space-y-3">
          <div className="h-6 w-28 bg-gray-300 rounded animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-full bg-gray-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Add review button */}
        <div className="h-10 w-40 bg-gray-300 rounded-lg animate-pulse" />
      </div>

      {/* Map section */}
      <section className="bg-white py-12 md:py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="h-8 w-48 bg-gray-300 mx-auto rounded animate-pulse mb-8" />
          <div className="relative w-full h-96 md:h-[450px] rounded-lg bg-gray-300 animate-pulse" />
        </div>
      </section>
    </div>
       
      );
    }

    if (isError ) {
      return (
        <div className="container mx-auto px-4 py-8 mt-24 text-center">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Oops!</strong>
            <span className="block sm:inline ml-2">
              Hotel not found or an error occurred.
            </span>
          </div>
        </div>
      );
    }

    const images: string[] = hotel?.imageUrls || [];
    //   const hasSingleImage = images.length === 1;

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
          <div className="relative w-full ">
            {/* Main Image Container */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded-lg overflow-hidden shadow-lg group">
              <Image
                src={images[currentIndex]}
                alt={`Hotel image ${currentIndex + 1}`}
                fill
                className="object-contain bg-black "
                // onClick={openModal}
                unoptimized={true}
              />

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
     <Image
                src={images[currentIndex]}
                alt={`Hotel image ${currentIndex + 1}`}
                fill
                className="object-contain bg-black "
                // onClick={openModal}
                unoptimized={true}
              />



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
                <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white  rounded-full text-sm">
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
                        ? "border-blue-500 opacity-100"
                        : "border-gray-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover "
                      unoptimized={true}
                    />
                  </button>
                ))}
              </div>
            )}

          </div>
        </>
      );
    };

    return (
      // <div className="container mx-auto px-4 py-8 mt-24 mb-10">
      <div className="mt-8">
        <div className=" bg-white/70 backdrop-blur-md border-b border-slate-200/40">
          <div className=" flex items-center justify-between px-4 py-4">
            <h1 className="text-xl sm:text-xl font-extrabold text-gray-800 leading-tight">
              {hotel.name}
            </h1>
            <Link
              href="/allrooms"
              className="inline-flex items-center rounded-xl  bg-blue-800 hover:cursor-pointer  px-4 py-2 text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all text-sm"
            >
              View All Rooms
            </Link>
          </div>
        </div>
        <div className="flex justify-between">

        <p className="text-lg text-gray-600 flex items-center mt-1">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          {hotel?.city}
        </p>
          <div className="flex items-center  mr-4">
                  <span className="text-sm text-gray-600 font-medium">PKR</span>
                  <p className="text-2xl font-bold text-green-600">
                    {hotel?.pricePerNight}
                  </p>
                  <span className="text-sm text-gray-500 ml-1">per night</span>
                </div> 
        </div>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="">
            {/* Images Section with Built-in Slider */}
            {images.length > 0 && (
              <div className="mb-8">
                <ImageSlider />
              </div>
            )}
            {/* <div className="sticky   top-0 z-20 bg-white/70 backdrop-blur-md border-b border-slate-200/40"> */}
              {/* <div className=" flex  items-center  justify-center "> */}
        

                
                    
      

          

            <hr className="my-6 border-gray-200" />

            {/* Description */}
            {hotel?.description && (
              <div className="mb-6">
                <h2 className="text-2xl  underline font-semibold text-gray-700 mb-3">
                  About :
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  <span className="tracking-tight text-sm">
                    {hotel?.description}
                  </span>
                </p>
              </div>
            )}

            {/* Room Status/Count */}
            {hotel?.roomStatus && (
              <div className="mb-6">
                <p className="text-green-600 flex items-center">
                  <FaBed className="mr-2 text-blue-500" size={32} />
                  Room :
                  <span className="bg-white  font-extrabold font-xl ml-2">
                    {hotel.roomStatus}
                  </span>
                </p>
              </div>
            )}

            {/* Facilities */}
            {hotel?.facilities && hotel.facilities.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3 underline">
                  Facilities :
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {hotel?.facilities?.map((facility, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <span className="text-sm font-serif">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Last Updated */}
            {/* {hotel?.lastUpdated && (
            <div className="mt-8 text-sm text-gray-500 text-right underline">
              Last updated: {new Date(hotel.lastUpdated).toLocaleDateString()}
            </div>
          )} */}
          </div>
        </div>
      
     
     

      </div>
    );
  };
