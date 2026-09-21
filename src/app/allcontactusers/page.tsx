"use client";

import { searchPageContact } from "../Api";
import { AppContext } from "../context/AppNotify";
import { useQuery } from "@tanstack/react-query";
import { Users, AlertCircle } from "lucide-react";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import SearchContactBar from "../components/SearchContactBar";
import Link from "next/link";

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
    <div className="max-w-7xl mx-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="mb-4">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-full" />
      </div>

      <div className="mb-4">
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-8 w-full" />
      </div>

      <div className="mb-4">
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-8 w-3/4" />
      </div>

      <div className="mb-4">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  </div>
);

const GetAllContacts = () => {
  const [page, setPage] = useState<number>(1);

  const { isAdmin } = AppContext();
  const search = useSearchContext();

  const searchParams = {
    name: search.name,
    phoneNumber: search.phoneNumber,
    page: page.toString(),
  };

  const queryKey = [
    "searchContacts",
    searchParams.name,
    searchParams.phoneNumber,
    searchParams.page,
  ];

  const {
    data: totalUsers,
    isLoading: usersLengthLoading,
    error: usersError,
  } = useQuery({
    queryKey,
    queryFn: () => searchPageContact(searchParams),
  });

  /* Loading */
  if (usersLengthLoading) {
    return <DashboardSkeleton />;
  }

  /* Error */
  if (usersError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-5 sm:p-8 w-full max-w-md text-center">
          <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto mb-4" />

          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Error Loading Data
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mb-5">
            Failed to load user data
          </p>

          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* Empty */
  if (!totalUsers) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-5 sm:p-8 w-full max-w-md text-center">
          <Users className="w-14 h-14 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            No Contacted Users
          </h2>

          <p className="text-sm sm:text-base text-gray-600">
            There are no contacted users in the system yet.
          </p>
        </div>
      </div>
    );
  }

  /* Access denied */
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

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold underline text-slate-800">
              All Contacts
            </h1>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-700 to-rose-600 px-4 sm:px-5 py-2.5 text-sm sm:text-base text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all"
            >
              Go to Dashboard
            </Link>

          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Search */}
        <div className="mb-6 sm:mb-8">
          <SearchContactBar />
        </div>

        {/* Contacts Container */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">

          <div className="p-4 sm:p-6">

            {!totalUsers || totalUsers.data.length === 0 ? (

              /* No Contacts */
              <div className="text-center py-10 sm:py-12 px-4">

                <Users className="w-12 h-12 sm:w-14 sm:h-14 text-gray-300 mx-auto mb-4" />

                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">
                  No Contact Found
                </h3>

                <button
                  onClick={() =>
                    (window.location.href = "/allcontactusers")
                  }
                  className="w-full sm:w-auto inline-flex justify-center items-center rounded-md bg-blue-600 px-5 py-2.5 font-medium text-sm sm:text-base text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Go Back
                </button>

              </div>

            ) : (

              /* Contacts */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">

                {totalUsers.data.map((deposit) => {
                  const {
                    phoneNumber,
                    email,
                    name,
                    message,
                    _id,
                  } = deposit;

                  return (
                    <div
                      key={_id}
                      className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200 hover:shadow-md transition-shadow min-w-0"
                    >

                      {/* Phone */}
                      <div className="mb-4">
                        <p className="text-sm font-bold text-gray-700 mb-1">
                          Phone Number
                        </p>

                        <p className="bg-white border rounded px-2.5 py-2 text-sm font-mono text-gray-700 break-words overflow-wrap-anywhere">
                          {phoneNumber}
                        </p>
                      </div>

                      {/* Email */}
                      <div className="mb-4">
                        <p className="text-sm font-bold text-gray-700 mb-1">
                          Email
                        </p>

                        <p className="bg-white border rounded px-2.5 py-2 text-sm font-mono text-gray-700 break-all">
                          {email}
                        </p>
                      </div>

                      {/* Name */}
                      <div className="mb-4">
                        <p className="text-sm font-bold text-gray-700 mb-1">
                          Name
                        </p>

                        <p className="bg-white border rounded px-2.5 py-2 text-sm font-mono text-gray-700 break-words">
                          {name}
                        </p>
                      </div>

                      {/* Message */}
                      <div>
                        <p className="text-sm font-bold text-gray-700 mb-1">
                          Message
                        </p>

                        <p className="bg-white border rounded px-2.5 py-2 text-sm font-mono text-gray-700 break-words whitespace-pre-wrap leading-relaxed">
                          {message}
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 sm:mt-8">
          <Pagination
            page={totalUsers?.pagination?.page || 1}
            pages={totalUsers?.pagination?.pages || 1}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>

      </main>
    </div>
  );
};

export default GetAllContacts;