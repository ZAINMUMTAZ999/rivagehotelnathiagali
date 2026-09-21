"use client";

import Link from "next/link";
import { AppContext } from "../context/AppNotify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { isAdmin } = AppContext();
  const router = useRouter();

  // Redirect non-admins
  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, router]);

  // Non-admin / loading state
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 px-4 sm:px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-red-600 mb-4 sm:mb-6">
            Oops! Page not found
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8">
            The page you are looking for does not exist or has been moved.
          </p>

          <Link
            href="/"
            className="
              inline-flex items-center justify-center
              px-5 py-2.5
              sm:px-6 sm:py-3
              active:bg-slate-500
              active:text-slate-700
              active:scale-95
              bg-green-500
              hover:bg-green-600
              text-white
              font-semibold
              text-sm sm:text-base
              rounded-lg
              shadow-md
              transition
              duration-300
            "
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16">
      <div className="w-full max-w-5xl mx-auto text-center">

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-8 sm:mb-10 md:mb-12">
          HotelWebApp
        </h1>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide underline text-gray-800 mb-8 sm:mb-10 md:mb-12">
          Admin Dashboard
        </h2>

        {/* Button Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

          {/* Add Hotel */}
          <Link
            href="/addroom"
            className="
              group block rounded-xl bg-white
              p-5 sm:p-6
              shadow-md hover:shadow-lg
              transition
              active:bg-slate-500
              active:text-slate-700
              active:scale-95
            "
          >
            <p className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Add Hotel➕
            </p>

            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Create a new hotel entry.
            </p>
          </Link>

          {/* Homepage Image */}
          <Link
            href="/addheroimage"
            className="
              group block rounded-xl bg-white
              p-5 sm:p-6
              shadow-md hover:shadow-lg
              transition
              active:bg-slate-500
              active:text-slate-700
              active:scale-95
            "
          >
            <p className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Add Homepage Image📷
            </p>

            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Upload hero images for the home page.
            </p>
          </Link>

          {/* Edit Rooms */}
          <Link
            href="/edit"
            className="
              group block rounded-xl bg-white
              p-5 sm:p-6
              shadow-md hover:shadow-lg
              transition
              active:bg-slate-500
              active:text-slate-700
              active:scale-95
            "
          >
            <p className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Edit/Delete Rooms🏨
            </p>

            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Manage and edit all listed rooms.
            </p>
          </Link>

          {/* Bookings */}
          <Link
            href="/addbookings"
            className="
              group block rounded-xl bg-white
              p-5 sm:p-6
              shadow-md hover:shadow-lg
              transition
              active:bg-slate-500
              active:text-slate-700
              active:scale-95
            "
          >
            <p className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Bookings📖
            </p>

            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Your Bookings.
            </p>
          </Link>

          {/* Contacts */}
          <Link
            href="/allcontactusers"
            className="
              group block rounded-xl bg-white
              p-5 sm:p-6
              shadow-md hover:shadow-lg
              transition
              active:bg-slate-500
              active:text-slate-700
              active:scale-95
            "
          >
            <p className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              All Contacts👥
            </p>

            <p className="mt-2 text-sm sm:text-base text-gray-500">
              All listed Contacts.
            </p>
          </Link>

        </div>
      </div>
    </main>
  );
}