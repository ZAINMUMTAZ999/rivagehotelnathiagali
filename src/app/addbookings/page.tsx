"use client";

import { AddBookingTypes, AddBookingApi } from "../Api";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  MessageSquare,
  Calendar,
  User,
  Phone,
  DollarSign,
  Clock,
} from "lucide-react";
import { AppContext } from "../context/AppNotify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const { showToast } = AppContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddBookingTypes>();

  const router = useRouter();

  const { mutate: addBooking, isPending } = useMutation({
    mutationFn: AddBookingApi,

    onSuccess: () => {
      showToast({
        type: "SUCCESS",
        message: "Booking Added!",
      });

      router.push("/dashboard");
    },

    onError: (error: Error) => {
      showToast({
        type: "ERROR",
        message: error?.message,
      });
    },
  });

  const onSubmit = (data: AddBookingTypes) => {
    addBooking(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 sm:py-10 md:py-12">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[-80px] sm:top-20 sm:left-10 md:left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />

        <div className="absolute top-32 right-[-80px] sm:top-40 sm:right-10 md:right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />

        <div className="absolute -bottom-8 left-10 sm:left-20 md:left-40 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">

          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-4 sm:mb-6 shadow-xl">
            <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Add New Booking
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
            Enter customer details to create a new hotel reservation
          </p>
        </div>

        {/* All Bookings */}
        <div className="mb-5 sm:mb-6">
          <Link
            href="/addbookings/allbookings"
            className="inline-flex items-center justify-center w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-lg bg-blue-600 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            All Bookings
          </Link>
        </div>

        {/* Main Form */}
        <div className="w-full max-w-4xl mx-auto">

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 md:px-8 py-4 sm:py-5">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">

                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />

                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Booking Details
                    </h2>
                  </div>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center w-full sm:w-auto rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 sm:px-5 py-2 sm:py-2.5 text-white font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-200 text-sm sm:text-base"
                  >
                    Go to Dashboard
                  </Link>

                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 md:p-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">

                  {/* Customer Name */}
                  <div className="space-y-2">

                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      Customer Name
                    </label>

                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Enter customer name"
                        className="w-full px-4 py-3 sm:py-3.5 pr-11 border-2 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white transition-all duration-200 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                        {...register("name", {
                          required: "Please enter customer name",
                        })}
                      />

                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                    </div>

                    {errors?.name && (
                      <div className="flex items-start gap-2 mt-2 text-red-600">
                        <div className="w-1 h-4 mt-0.5 flex-shrink-0 rounded-full bg-red-500" />
                        <span className="text-xs sm:text-sm font-medium break-words">
                          {errors.name.message}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">

                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Phone Number
                    </label>

                    <div className="relative group">
                      <input
                        type="number"
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 sm:py-3.5 pr-11 border-2 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white transition-all duration-200 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                        {...register("phoneNumber", {
                          required: "Please enter phone number",
                        })}
                      />

                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                      </div>
                    </div>

                    {errors?.phoneNumber && (
                      <div className="flex items-start gap-2 mt-2 text-red-600">
                        <div className="w-1 h-4 mt-0.5 flex-shrink-0 rounded-full bg-red-500" />
                        <span className="text-xs sm:text-sm font-medium break-words">
                          {errors.phoneNumber.message}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">

                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      Booking Amount
                    </label>

                    <div className="relative group">
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full px-4 py-3 sm:py-3.5 pr-11 border-2 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white transition-all duration-200 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                        {...register("Amount", {
                          required: "Please enter booking amount",
                        })}
                      />

                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                    </div>

                    {errors?.Amount && (
                      <div className="flex items-start gap-2 mt-2 text-red-600">
                        <div className="w-1 h-4 mt-0.5 flex-shrink-0 rounded-full bg-red-500" />
                        <span className="text-xs sm:text-sm font-medium break-words">
                          {errors.Amount.message}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  <div className="space-y-2">

                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      Booking Time
                    </label>

                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Select time"
                        className="w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white transition-all duration-200 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                        {...register("time", {
                          required: "Please select booking time",
                        })}
                      />
                    </div>

                    {errors?.time && (
                      <div className="flex items-start gap-2 mt-2 text-red-600">
                        <div className="w-1 h-4 mt-0.5 flex-shrink-0 rounded-full bg-red-500" />
                        <span className="text-xs sm:text-sm font-medium break-words">
                          {errors.time.message}
                        </span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Submit */}
                <div className="mt-7 sm:mt-9 md:mt-10">

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 text-base sm:text-lg cursor-pointer"
                  >
                    {isPending ? "Creating Booking..." : "Create Booking"}
                  </button>

                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            All booking information will be securely stored in the system
          </p>
        </div>

      </div>
    </div>
  );
}