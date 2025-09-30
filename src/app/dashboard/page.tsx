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
      router.replace("/"); // or "/login" or any other page
    }
  }, [isAdmin, router]);

  // Optional: show loading while checking
  if (!isAdmin) {
    return(
       <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 px-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-600 mb-6">
          Oops! Page not found
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
    )
  }
  return (
    <main className=" mt-16  flex items-center justify-center px-4">
      <div className="w-full max-w-4xl text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-800 mb-20">
          Rivage Cottage Resort Nathia Gali
        </h1>
        <h2 className="text-3xl underline font-extrabold tracking-widest text-gray-800 mb-8">
          Admin Dashboard
        </h2>

        {/* Button Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/addroom"
            className="group block rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Add Hotel➕
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Create a new hotel entry.
            </p>
          </Link>

          <Link
            href="/addheroimage"
            className="group block rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Add Homepage Image📷
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Upload hero images for the home page.
            </p>
          </Link>

          <Link
            href="/crudrooms"
            className="group block rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Edit/Delete Rooms🏨
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Manage and edit all listed rooms.
            </p>
          </Link>
          <Link
            href="/addbookings"
            className="group block rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Bookings📖
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              ArcadianResort Bookings.
            </p>
          </Link>
          <Link
            href="/allcontactusers"
            className="group block rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              All Contacts👥
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              ArcadianResort all listed Contacts.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
