"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { addHeroImageTypes, heroImageApi } from "../Api";
import WhatsAppLinkButton from "./WA";
import Link from "next/link";
import PwaInstallPrompt from "./PwaInstallPrompt";

export default function GetHeroImageHomepage() {
  const { data, isLoading, isError, error } = useQuery<
    addHeroImageTypes,
    Error
  >({
    queryKey: ["heroImage"],
    queryFn: heroImageApi,
  });

  /* Loading */
  if (isLoading) {
    return (
      <div className="relative w-full min-h-screen bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4">
          <div className="w-3/4 max-w-3xl h-10 sm:h-14 md:h-16 lg:h-20 bg-gray-400 rounded mb-6" />

          <div className="w-32 sm:w-40 h-10 bg-gray-400 rounded" />
        </div>
      </div>
    );
  }

  /* Error */
  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-8 sm:mt-10 md:mt-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
          <p className="text-red-600 font-medium">
            Refresh to load Homepage Image
          </p>

          <p className="text-red-500 text-sm mt-1 break-words">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  const img = data?.imageFile;

  if (!img) return null;

  return (
    <div className="relative w-full min-h-screen">

      {/* Hero Image */}
      <Image
        src={img}
        alt="Arcadian Resort"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center">

        {/* Main Heading */}
        <h1
          className="
            text-gray-200 font-extrabold tracking-tight
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            xl:text-7xl
            leading-tight
            max-w-5xl
          "
        >
          HotelWebApp Islamabad
        </h1>

        {/* Subheading */}
        <h2
          className="
            mt-4 sm:mt-5 md:mt-6
            text-gray-200 font-semibold tracking-wide
            text-base
            sm:text-lg
            md:text-xl
            lg:text-2xl
            xl:text-3xl
            max-w-3xl
            leading-relaxed
          "
        >
          Nestled amidst whispering pines, our resort offers an unparalleled
          blend of comfort, luxury, and breathtaking mountain vistas.
        </h2>

        {/* Rooms Button */}
        <Link href="/allrooms">
          <button
            className="
              mt-6 sm:mt-7 md:mt-8
              px-5 py-2.5
              sm:px-6 sm:py-3
              md:px-7 md:py-3.5
              border-2 border-blue-200
              active:bg-slate-500
              active:text-slate-700
              active:scale-95
              cursor-pointer
              font-serif
              text-sm
              sm:text-base
              md:text-lg
              lg:text-xl
              rounded-md
              bg-blue-600
              hover:bg-blue-700
              text-white
              transition-all
              duration-300
            "
          >
            View Rooms
          </button>
        </Link>

        <PwaInstallPrompt />

      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-30">
        <WhatsAppLinkButton
          phoneNumber="923459280907"
          message="Book your resort stay—message us!"
        />
      </div>

    </div>
  );
}