"use client";

import { useState } from "react";
import {
  User,
  Phone,
  DollarSign,
  Clock,
  Calendar,
  MoreVertical,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { AddBookingTypes, GetAllBookingsApi } from "../../Api";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../../context/AppNotify";
import { useSearchContext } from "@/app/context/SearchContext";
import Pagination from "@/app/components/Pagination";
import SearchContactBar from "@/app/components/SearchContactBar";

export default function Bookings() {
  const [page, setPage] = useState<number>(1);

  const { isAdmin } = AppContext();
  const search = useSearchContext();

  const searchParams = {
    name: search.name,
    phoneNumber: search.phoneNumber,
    page: page.toString(),
  };

  const queryKey = [
    "searchBookings",
    searchParams.name,
    searchParams.phoneNumber,
    searchParams.page,
  ];

  const {
    data: bookingsData,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn: () => GetAllBookingsApi(searchParams),
  });

  const data = bookingsData?.data;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return time || "N/A";
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles = {
      confirmed: "bg-green-100 text-green-700 border-green-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      completed: "bg-blue-100 text-blue-700 border-blue-200",
      cancelled: "bg-red-100 text-red-700 border-red-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${
          statusStyles[status as keyof typeof statusStyles] ||
          statusStyles.pending
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  /* Access Denied */
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-5 sm:p-8 w-full max-w-md text-center">
          <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 mx-auto mb-4" />

          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Access Denied
          </h2>

          <p className="text-sm sm:text-base text-gray-600">
            You don&apos;t have permission to view this dashboard.
          </p>
        </div>
      </div>
    );
  }

  /* Loading */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="h-7 w-36 bg-gray-300 rounded animate-pulse" />
            <div className="h-10 w-full sm:w-40 bg-gray-300 rounded-xl animate-pulse" />
          </div>

          {/* Search Skeleton */}
          <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse mb-6" />

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse"
              >
                {/* Header */}
                <div className="bg-gray-300 px-4 sm:px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg" />

                    <div className="space-y-2">
                      <div className="h-4 w-28 bg-gray-200 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5 space-y-4">

                  <div className="flex items-center justify-between">
                    <div className="h-6 w-24 bg-gray-200 rounded-full" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </div>

                  <div className="space-y-3">

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-9 h-9 bg-gray-200 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-20 bg-gray-200 rounded" />
                        <div className="h-4 w-32 bg-gray-300 rounded" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-9 h-9 bg-gray-200 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                        <div className="h-4 w-20 bg-gray-300 rounded" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                        <div className="w-9 h-9 bg-gray-200 rounded-lg flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-10 bg-gray-200 rounded" />
                          <div className="h-3 w-16 bg-gray-300 rounded" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                        <div className="w-9 h-9 bg-gray-200 rounded-lg flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-10 bg-gray-200 rounded" />
                          <div className="h-3 w-16 bg-gray-300 rounded" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 sm:py-8 lg:py-12">

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-lg underline sm:text-xl font-bold text-slate-800">
            All Bookings
          </h1>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-xl bg-blue-600  px-4 py-2 text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all text-sm" 
          >
            Go to Dashboard 
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8">
          <SearchContactBar />
        </div>

        {/* Booking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

          {data?.map((booking: AddBookingTypes) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden group min-w-0"
            >

              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-5 py-4">

                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-white font-bold text-base sm:text-lg truncate">
                        {booking.name}
                      </h3>
                    </div>

                  </div>

                  <button
                    type="button"
                    aria-label="Booking options"
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                  >
                    <MoreVertical className="w-5 h-5 text-white" />
                  </button>

                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-4">

                {/* Status + ID */}
                <div className="flex flex-col xs:flex-row sm:flex-row sm:items-center sm:justify-between gap-2">

                  <StatusBadge status="confirmed" />

                  <span className="text-xs text-gray-500 break-all">
                    ID: #{booking._id.slice(-6)}
                  </span>

                </div>

                <div className="space-y-3">

                  {/* Phone */}
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">

                    <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-600 font-medium mb-0.5">
                        Phone Number
                      </p>

                      <p className="text-sm font-semibold text-gray-900 break-words">
                        {booking.phoneNumber}
                      </p>
                    </div>

                  </div>

                  {/* Amount */}
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">

                    <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-600 font-medium mb-0.5">
                        Booking Amount
                      </p>

                      <p className="text-sm font-bold text-gray-900">
                        ${parseFloat(booking.Amount).toFixed(2)}
                      </p>
                    </div>

                  </div>

                  {/* Date + Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    {/* Date */}
                    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl border border-purple-100 min-w-0">

                      <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-purple-600" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-600 font-medium mb-0.5">
                          Date
                        </p>

                        <p className="text-xs font-semibold text-gray-900 break-words">
                          {formatDate(booking.createdAt)}
                        </p>
                      </div>

                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100 min-w-0">

                      <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-600 font-medium mb-0.5">
                          Time
                        </p>

                        <p className="text-xs font-semibold text-gray-900 break-words">
                          {formatTime(booking.time)}
                        </p>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Pagination */}
        <div className="mt-6 sm:mt-8 overflow-x-auto">
          <Pagination
            page={bookingsData?.pagination?.page || 1}
            pages={bookingsData?.pagination?.pages || 1}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>

      </div>
    </div>
  );
}