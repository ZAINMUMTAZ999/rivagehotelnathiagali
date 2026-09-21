"use client";

import { useQuery } from "@tanstack/react-query";
import { FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { getHotelApiBId } from "../../Api";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetEachHotelReviewId } from "../../components/GetEachHotelReviewId";
import { useParams } from "next/navigation";

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

const MyHotelsById = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useParams<{ id: string }>();

  const {
    data: hotel,
    isLoading,
    isError,
  } = useQuery<addHotelTypes>({
    queryKey: ["hotel", id],
    queryFn: () => getHotelApiBId(id),
    enabled: Boolean(id),
  });

  const whatsappUrl = `https://wa.me/923459280907?text=${encodeURIComponent(
    `Hello! I'm interested in this hotel: https://demosekaispacehotelapp.vercel.app/allrooms/${id}`
  )}`;

  /* ---------------- LOADING ---------------- */

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 animate-pulse">

        {/* Image */}
        <div className="relative w-full">
          <div className="relative h-64 sm:h-80 md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden bg-gray-200">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-gray-300 rounded-full" />

            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-gray-300 rounded-full" />

            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-16 h-7 bg-gray-300 rounded-full" />
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-hidden pb-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg bg-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 sm:px-2 py-4">
          <div className="h-7 w-48 bg-gray-300 rounded" />
          <div className="h-10 w-full sm:w-32 bg-gray-300 rounded-xl" />
        </div>

        {/* Location + Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 sm:px-2 py-3">
          <div className="h-5 w-32 bg-gray-300 rounded" />

          <div className="h-7 w-40 bg-gray-300 rounded" />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-4 sm:p-6 space-y-6">

          <div className="h-12 w-full sm:w-72 bg-gray-300 rounded-lg" />

          <div className="h-5 w-32 bg-gray-300 rounded" />

          <div className="space-y-2">
            <div className="h-7 w-24 bg-gray-300 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 rounded" />
          </div>

          <div className="h-7 w-40 bg-gray-300 rounded" />

          <div className="space-y-3">
            <div className="h-7 w-28 bg-gray-300 rounded" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-full bg-gray-200 rounded-md"
                />
              ))}
            </div>
          </div>

          <div className="h-10 w-32 bg-gray-300 rounded-lg" />
        </div>

        {/* Map Skeleton */}
        <section className="bg-white py-10 sm:py-12 md:py-16 mt-8">
          <div>
            <div className="h-8 w-48 bg-gray-300 mx-auto rounded mb-8" />

            <div className="relative w-full h-72 sm:h-80 md:h-[450px] rounded-xl bg-gray-300" />
          </div>
        </section>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */

  if (isError || !hotel) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6">
        <div
          className="w-full max-w-2xl bg-red-100 border border-red-400 text-red-700 px-4 sm:px-6 py-4 rounded-lg text-center"
          role="alert"
        >
          <strong className="font-bold">Oops!</strong>

          <span className="block sm:inline sm:ml-2 mt-1 sm:mt-0">
            Hotel not found or an error occurred.
          </span>
        </div>
      </div>
    );
  }

  const images: string[] = hotel.imageUrls || [];

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

  /* ---------------- IMAGE SLIDER ---------------- */

  const ImageSlider = () => {
    if (images.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 sm:h-80 md:h-[500px] bg-gray-100 rounded-xl">
          <div className="text-center text-gray-500 px-4">
            <p className="text-base sm:text-lg">
              No images available
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full">

        {/* Main Image */}
        <div className="relative h-64 sm:h-80 md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-xl bg-black">

          <Image
            src={images[currentIndex]}
            alt={`Hotel image ${currentIndex + 1}`}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 90vw, 1200px"
            className="object-contain"
            unoptimized
          />

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white active:bg-slate-200 active:scale-95 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-150 z-10 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white active:bg-slate-200 active:scale-95 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-150 z-10 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              </button>
            </>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 sm:px-3 py-1 bg-black/60 text-white rounded-full text-xs sm:text-sm font-medium z-10">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2 px-1">

            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-150 active:scale-95 ${
                  index === currentIndex
                    ? "border-blue-600 opacity-100 ring-2 ring-blue-300"
                    : "border-gray-300 opacity-70 hover:opacity-90"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}

          </div>
        )}
      </div>
    );
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-4">

      {/* HEADER */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/40 sticky top-0 z-20">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 sm:px-2 py-3 sm:py-4">

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black leading-tight break-words">
            {hotel.name}
          </h1>

          <Link
            href="/allrooms"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-950 active:scale-95 px-4 py-2.5 text-white font-semibold shadow transition-all duration-150 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View All Rooms
          </Link>

        </div>
      </div>

      {/* LOCATION + PRICE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 sm:px-2 py-3 sm:py-4">

        <p className="text-sm sm:text-base md:text-lg text-gray-600 flex items-center min-w-0">
          <FaMapMarkerAlt className="mr-2 text-red-500 flex-shrink-0" />

          <span className="break-words">
            {hotel.city}
          </span>
        </p>

        <div className="flex items-baseline">

          <span className="text-xs sm:text-sm text-gray-600 font-medium mr-1">
            PKR
          </span>

          <p className="text-2xl sm:text-3xl font-bold text-black">
            {hotel.pricePerNight}
          </p>

          <span className="text-xs sm:text-sm text-gray-500 ml-1">
            / night
          </span>

        </div>
      </div>

      {/* MAIN HOTEL CONTENT */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden mt-2 sm:mt-4 p-4 sm:p-5 md:p-6">

        {/* Slider */}
        {images.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <ImageSlider />
          </div>
        )}

        {/* BOOK NOW */}
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center mb-6 active:scale-95 transition-transform duration-150"
        >
          <Button
            className="w-full sm:w-72 flex justify-center items-center cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-950 text-white font-medium rounded-lg py-3 shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Book Now Pay Later
          </Button>
        </Link>

        {/* ACCOMMODATION TYPE */}
        <div className="text-sm sm:text-base text-gray-500 mt-1 mb-4">
          <span className="font-semibold capitalize">
            {hotel.type}
          </span>{" "}
          Accommodation
        </div>

        <hr className="my-5 sm:my-6 border-gray-200" />

        {/* DESCRIPTION */}
        {hotel.description && (
          <div className="mb-6 sm:mb-8">

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
              About
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
              {hotel.description}
            </p>

          </div>
        )}

        {/* ROOM STATUS */}
        {hotel.roomStatus && (
          <div className="mb-6">

            <p className="text-sm sm:text-base md:text-lg text-gray-700 flex items-center flex-wrap font-medium gap-y-1">

              <FaBed className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" size={20} />

              <span>
                Room Status:
              </span>

              <span className="font-extrabold text-green-600 ml-1 sm:ml-2">
                {hotel.roomStatus}
              </span>

            </p>
          </div>
        )}

        {/* FACILITIES */}
        {hotel.facilities && hotel.facilities.length > 0 && (
          <div className="mb-6">

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
              Facilities
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4">

              {hotel.facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center min-h-10 bg-gray-50 border border-gray-200 p-2.5 sm:p-3 rounded-xl shadow-sm text-gray-700 text-center text-xs sm:text-sm font-medium hover:bg-blue-50 active:bg-slate-100 active:scale-95 transition-all duration-150 break-words"
                >
                  <span>
                    {facility}
                  </span>
                </div>
              ))}

            </div>
          </div>
        )}
      </div>

      {/* ADD REVIEW */}
      <div className="mt-4">

        <Button
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-950 active:scale-95 px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-150"
        >
          <Link href={`/allrooms/${hotel._id}/add-review`}>
            + Add Review
          </Link>
        </Button>

      </div>

      {/* REVIEWS */}
      <div className="mt-6 sm:mt-8">
        <GetEachHotelReviewId hotelId={id} />
      </div>

      {/* LOCATION */}
      <section className="bg-white py-10 sm:py-12 md:py-16 border-t border-gray-200 mt-8 sm:mt-10">

        <div className="w-full">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 md:mb-10">
            Our Location
          </h2>

          <div className="w-full max-w-5xl mx-auto">

            <div className="relative w-full h-72 sm:h-80 md:h-[450px] rounded-xl overflow-hidden shadow-2xl">

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16331.505839226038!2d73.07451985!3d33.73100910000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf7769d89d8d%3A0x5d6d89877331b187!2sF-6%2C%20Islamabad!5e1!3m2!1sen!2s!4v1759513124803!5m2!1sen!2s"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rivage Resort Nathia Gali Location"
              />

            </div>

            <p className="text-center text-xs sm:text-sm text-gray-600 mt-3 md:hidden">
              Use two fingers to zoom and pan the map
            </p>

          </div>
        </div>
      </section>

    </main>
  );
};

export default MyHotelsById;