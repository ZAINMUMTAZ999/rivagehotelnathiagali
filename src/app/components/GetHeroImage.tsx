"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { addHeroImageTypes, heroImageApi } from "../Api";
import WhatsAppLinkButton from "./WA";
import Link from "next/link";
import PwaInstallPrompt from "./PwaInstallPrompt";
// import { Button } from "./ui/button";

export default function GetHeroImageHomepage() {
  const { data, isLoading, isError, error } = useQuery<
    addHeroImageTypes,
    Error
  >({
    queryKey: ["heroImage"],
    queryFn: heroImageApi,
  });

  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-gray-200 animate-pulse">
        {/* Overlay skeleton for heading and button */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4">
          {/* Heading placeholder */}
          <div className="w-3/4 h-12 sm:h-14 md:h-16 lg:h-20 bg-gray-400 rounded mb-6"></div>

          {/* Button placeholder */}
          <div className="w-32 h-10 bg-gray-400 rounded mb-4"></div>

          {/* Subtitle placeholder */}
          {/* <div className="w-2/3 h-6 sm:h-8 md:h-10 bg-gray-400 rounded"></div> */}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">
            Refresh to load Homepage Image
          </p>
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  const img = data?.imageFile ;
//   console.log(data?.imageFile)
  if (!img) return null;

  return (
   <div className="relative w-full h-screen">
  <Image
    src={img}
    alt="ArcadianResort"
    fill
    className="object-cover object-center"
    priority
  />

  {/* Overlay */}
  <div className="
    absolute inset-0 bg-black/40 flex flex-col items-center
    justify-start sm:justify-center px-4
    pt-56 sm:pt-0
    text-center
  ">
    {/* Main Heading */}
    <h1 className="
      text-gray-300 font-extrabold tracking-tight
      text-4xl sm:text-xl md:text-6xl lg:text-7xl
      leading-snug
    ">
      HotelWebApp Islamabad
    </h1>

    {/* Subheading / Tagline */}
    <h2 className="
      mt-4 text-gray-200 font-semibold tracking-wide
      text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
      max-w-3xl leading-relaxed
    ">
      Nestled amidst whispering pines, our resort offers an unparalleled blend of comfort, luxury, and breathtaking mountain vistas.
    </h2>

    {/* Rooms Button */}
    <Link href="/allrooms">
      <button className="
        mt-6 px-6 py-3 border-2 border-gray-200 hover:bg-gray-500
        hover:cursor-pointer
        font-serif text-base sm:text-lg md:text-xl rounded-md
        bg-gray-200 text-black transition-all duration-300
      ">
        View Rooms
      </button>
    </Link>

        <PwaInstallPrompt />
    {/* WhatsApp floating button */}
    <div className="fixed bottom-4 right-6 z-30">
      <WhatsAppLinkButton
        phoneNumber="923459280907"
        message="Book your resort stay—message us!"
      />
    </div>
  </div>
</div>

  );
}
