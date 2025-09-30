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
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);
const DashboardSkeleton = () => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-screen ">
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
    queryKey: queryKey,
    queryFn: () => searchPageContact(searchParams),
  });

  if (usersLengthLoading) {
    return <DashboardSkeleton />;
  }

  if (usersError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">
            {usersError
              ? "Failed to load user data"
              : "Failed to load deposit data"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!totalUsers) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Contacted Users
          </h2>
          <p className="text-gray-600">
            There are no contacted users in the system yet.
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don&apos;t have permission to view this dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="sticky  top-0 z-20 bg-white/70 backdrop-blur-md border-b border-slate-200/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-lg underline sm:text-xl font-bold text-slate-800">
            AllContacts
          </h1>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-700 to-rose-600 px-4 py-2 text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all text-sm" 
          >
            Go to Dashboard 
          </Link>
        </div>
      </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <SearchContactBar />

        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="p-6">
              {!totalUsers || totalUsers.data.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Contact Found
                  </h3>
                  <button
                    onClick={() => (window.location.href = "/allcontactusers")}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium justify-center items-center text-center
                 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2
                 focus:ring-blue-400"
                  >
                    GoBack
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {totalUsers?.data.map((deposit) => {
                    const { phoneNumber, email, name, message, _id } = deposit;

                    return (
                      <div
                        key={_id}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="mb-4">
                          <h3 className="text-sm font-bold text-gray-700 mb-1">
                            PhoneNumber :
                            <span className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
                              {phoneNumber}
                            </span>
                          </h3>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-sm font-bold text-gray-700 mb-1">
                            email :
                            <span className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
                              {email}
                            </span>
                          </h3>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-sm font-bold text-gray-700 mb-1">
                            name :
                            <span className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
                              {name}
                            </span>
                          </h3>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-sm font-bold text-gray-700 mb-1">
                            message :
                            <span className="ml-2 text-sm font-mono bg-white px-2 py-1 rounded border">
                              {message}
                            </span>
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Pagination
            page={totalUsers?.pagination?.page || 1}
            pages={totalUsers?.pagination?.pages || 1}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default GetAllContacts;
