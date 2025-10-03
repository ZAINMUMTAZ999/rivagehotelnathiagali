"use client";
import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";

import {
  FaMapMarkerAlt,
  //   FaDollarSign,
  FaBed,
} from "react-icons/fa";

import { getHotelApiBId } from "../../Api";
// import { AppContext } from "@/context/AppNotify";
import Image from "next/image";
// import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetEachHotelReviewId } from "../../components/GetEachHotelReviewId";
import { useParams } from "next/navigation";
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
// const  BookNowButton=()=> {
//   // ✅ Get the dynamic id from the current URL
//   const { id } = useParams<{ id: string }>();

//   // ✅ Build the WhatsApp link including this hotel’s page URL
//   const whatsappUrl = `https://wa.me/923459280907?text=${encodeURIComponent(
//     `Hello! I'm interested in this hotel: https://your-domain.com/allrooms/${id}`
//   )}`
// };
// type Props = { id: string };
const MyHotelsById = () =>
  // { params }: { params: { id: string } }
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
 
    const { id } = useParams<{ id: string }>();
     console.log("idParams", id);

  const whatsappUrl = `https://wa.me/923246288217?text=${encodeURIComponent(
    `Hello! I'm interested in this hotel: https://demosekaispacehotelapp.vercel.app/allrooms/${id}`
  )}`;
    const {
      data: hotel,
      isLoading,
      isError,

    } = useQuery<addHotelTypes>({
          queryKey: ["id"],
      queryFn: () => getHotelApiBId(id),
      enabled: Boolean(id),
    });
    // console.log("idReview", hotel);

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

    if (isError || !hotel) {
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

 // Assume Image, ChevronLeft, ChevronRight, currentIndex, goToPrevious, goToNext, goToSlide are available in this scope.

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
      <div className="relative w-full">
        {/* Main Image Container */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-xl group">
          <Image
            src={images[currentIndex]}
            alt={`Hotel image ${currentIndex + 1}`}
            fill
            className="object-contain bg-black"
            // onClick={openModal} // Kept commented out for no logic change
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
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              
              {/* REMOVED DUPLICATE IMAGE TAG HERE */}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-black bg-opacity-60 text-white rounded-full text-sm font-medium z-10"> 
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 relative ${
                  index === currentIndex
                    ? "border-blue-600 opacity-100 ring-2 ring-blue-300" // Enhanced active state
                    : "border-gray-300 opacity-70 hover:opacity-90"
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
      </div>
    </>
  );
};

    return (
      // <div className="container mx-auto px-4 py-8 mt-24 mb-10">
   <div className="mt-8">
  {/* Header Section: Name and View All Rooms Button */}
  <div className="bg-white/70 backdrop-blur-md border-b border-slate-200/40 sticky top-0 z-10">
    <div className="flex items-center justify-between px-4 py-4">
      <h1 className="text-2xl font-extrabold text-gray-800 leading-tight">
        {hotel.name}
      </h1>
      <Link
        href="/allrooms"
        className="inline-flex items-center rounded-xl bg-blue-800 hover:bg-blue-900 px-4 py-2 text-white font-semibold shadow transition-all text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        // Removed unnecessary hover:from/to-red classes for consistency with blue
      >
        View All Rooms
      </Link>
    </div>
  </div>
  
  {/* Location and Price Section */}
  <div className="flex justify-between items-center px-4 py-2">
    <p className="text-lg text-gray-600 flex items-center">
      <FaMapMarkerAlt className="mr-2 text-red-500" />
      {hotel?.city}
    </p>
    <div className="flex items-baseline">
      <span className="text-sm text-gray-600 font-medium mr-1">PKR</span>
      <p className="text-3xl font-bold text-green-600">
        {hotel?.pricePerNight}
      </p>
      <span className="text-sm text-gray-500 ml-1">per night</span>
    </div>
  </div>

  <div className="bg-white rounded-lg shadow-xl overflow-hidden mt-4 p-4">
    
    {/* Images Section with Slider */}
    {images.length > 0 && (
      <div className="mb-6">
        <ImageSlider />
      </div>
    )}

    {/* Book Now Button (made it full width and centered in the flow) */}
    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block mb-6">
      <Button className="flex justify-center items-center w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Book Now Pay Later
      </Button>
    </Link>
    
    {/* Accommodation Type */}
    <div className="text-md text-gray-500 mt-1 mb-4">
      <span className="font-semibold capitalize">{hotel?.type}</span> Accommodation
    </div>

    <hr className="my-6 border-gray-200" />

    {/* Description / About */}
    {hotel?.description && (
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          About
        </h2>
        {/* Corrected spelling/grammar on the placeholder text in the screenshot */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
          {/* Removed unnecessary tracking-tight text-sm classes from the inner span for better readability */}
          {hotel?.description}
        </p>
      </div>
    )}

    {/* Room Status/Count */}
    {hotel?.roomStatus && (
      <div className="mb-6">
        <p className="text-lg text-gray-700 flex items-center font-medium">
          <FaBed className="mr-3 text-blue-500" size={24} /> {/* Adjusted size/margin for better alignment */}
          Room Status:
          <span className="font-extrabold text-green-600 ml-2">
            {hotel.roomStatus}
          </span>
        </p>
      </div>
    )}

    {/* Facilities */}
    {hotel?.facilities && hotel.facilities.length > 0 && (
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Facilities
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {hotel?.facilities?.map((facility, index) => (
            <div
              key={index}
              // Improved visual style: solid background and consistent padding
              className="flex items-center justify-center bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm text-gray-700 text-center text-sm font-medium hover:bg-blue-50 transition-colors duration-200"
            >
              <span className="text-sm font-sans">{facility}</span> 
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

  </div> {/* end of bg-white container */}

  {/* Review Section */}
  <Button
    className="bg-blue-700 hover:bg-blue-800 mt-4 px-6 py-3 font-semibold rounded-lg shadow-md"
  >
    <Link href={`/allrooms/${hotel._id}/add-review`}>+ Add Review</Link>
  </Button>
  
  <div className="mt-8">
    <GetEachHotelReviewId
      hotelId={id}
    />
  </div>

  {/* Location Section */}
  <section className="bg-white py-12 md:py-16 border-t border-gray-200 mt-8">
    <div className="container mx-auto px-4 max-w-7xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Our Location
      </h2>

      <div className="w-full max-w-4xl mx-auto">
        <div className="relative w-full h-96 md:h-[450px] rounded-xl overflow-hidden shadow-2xl">
          {/* NOTE: I cannot fix the 'googleusercontent.com/maps.google.com/0' URL as it's a logic change, but I can improve the container */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16331.505839226038!2d73.07451985!3d33.73100910000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf7769d89d8d%3A0x5d6d89877331b187!2sF-6%2C%20Islamabad!5e1!3m2!1sen!2s!4v1759513124803!5m2!1sen!2s" 
            className="absolute top-0 left-0 w-full h-full border-0 touch-auto"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rivage Resort Nathia Gali Location"
            style={{ pointerEvents: "auto" }}
          />
        </div>
        <p className="text-center text-sm text-gray-600 mt-3 md:hidden">
          Use two fingers to zoom and pan the map
        </p>
      </div>
    </div>
  </section>
</div>

    );
  };

export default MyHotelsById;



