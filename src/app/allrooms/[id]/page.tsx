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
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetEachHotelReviewId } from "../../components/GetEachHotelReviewId";
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
    // const { id } = useParams<{ id: string }>();
    // const { id } = useParams<{ id: string }>();
    const { id } = useParams<{ id: string }>();
    console.log("idParams", id);

    //  const { id } = useParams<{ id: string }>();

  const whatsappUrl = `https://wa.me/923459280907?text=${encodeURIComponent(
    `Hello! I'm interested in this hotel: https://rivagehotelnathiagali.vercel.app/allrooms/${id}`
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
    console.log("idReview", hotel);

    if (isLoading) {
      return (
        <div className="container mx-auto px-4 py-8 mt-24 animate-pulse">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-96 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>
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
      // if(isloadingID){
      //   return (
      //     <div className="relative w-full mx-auto">
      //   {/* Main Image Container */}
      //   <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-200 animate-pulse">
      //     {/* Left arrow placeholder */}
      //     <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-300 rounded-full shadow-md" />
      //     {/* Right arrow placeholder */}
      //     <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-300 rounded-full shadow-md" />
      //     {/* Image counter placeholder */}
      //     <div className="absolute top-4 left-4 px-6 py-2 rounded-full bg-gray-300" />
      //   </div>

      //   {/* Thumbnail Navigation */}
      //   <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
      //     {Array(5)
      //       .fill(0)
      //       .map((_, idx) => (
      //         <div
      //           key={idx}
      //           className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-200 animate-pulse border-2 border-gray-300"
      //         />
      //       ))}
      //   </div>
      // </div>
      //   )
      // }

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
        
                <Button className="flex justify-center items-center w-full   hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
       <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        Book Now Pay Later
      </Link>
                </Button>
                
                    
      

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <div>
                {/* <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
                {hotel?.name}
              </h1> */}
                {/* <span className="flex   "> */}

                {/* <p className="text-lg text-gray-600 flex items-center mt-1">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {hotel?.city}
              </p> */}

                {/* </span> */}
                <p className="text-md text-gray-500 mt-1">
                  <span className="font-semibold">{hotel?.type}</span> Hotel
                </p>
              </div>
            </div>

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
        {/* <AddReviewById/> */}
        <Button
          className="
      
      
      bg-blue-700 hover:bg-blue-800 hover:cursor-pointer mt-4 "
        >
          <Link href={`/allrooms/${hotel._id}/add-review`}>Add Review</Link>
        </Button>
        <span>
          {/* Reviews  {hotel.name} */}
          <GetEachHotelReviewId
            // hotelId={params.id}
            hotelId={id}
          />
        </span>

        <section className="bg-white py-12 md:py-16 border-t border-gray-200 w">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-800 mb-8">
              Our Location in Nathia Gali
            </h2>

            <div className="w-full max-w-4xl mx-auto">
              <div className="relative w-full h-96 md:h-[450px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4066.4109750194434!2d73.37977728841653!3d34.07551884727791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfd5762d7b4765%3A0xcb0a4f3dd7101a87!2sCottage%20Nathiagali!5e1!3m2!1sen!2s!4v1758538761264!5m2!1sen!2s"
                  className="absolute top-0 left-0 w-full h-full border-0 touch-auto"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rivage Resort Nathia Gali  Location"
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



