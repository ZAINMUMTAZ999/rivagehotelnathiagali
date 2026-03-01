
"use client";
import { AddBookingTypes } from "../Api";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AddBookingApi } from "../Api";
import { MessageSquare, Calendar, User, Phone, DollarSign, Clock } from "lucide-react";
import { useRef } from "react";
import { AppContext } from "../context/AppNotify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page () {
  const { showToast } = AppContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddBookingTypes>();
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  const { mutate: addReview } = useMutation({
    mutationFn: AddBookingApi,
    onSuccess: () => {
      showToast({ type: "SUCCESS", message: "Booking Added!" });
        router.push("/dashboard");
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error?.message });
    },
  });

  const onSubmit = (data: AddBookingTypes) => {
    addReview(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 sm:py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 sm:left-40 w-48 h-48 sm:w-72 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-4 sm:mb-6 shadow-xl">
            <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Add New Booking
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Enter customer details to create a new hotel reservation
          </p>
    </div>
    
 <Link
  href="/addbookings/allbookings"
  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 
             text-sm font-medium text-white shadow-sm hover:bg-blue-700 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
             transition disabled:cursor-not-allowed disabled:opacity-60"
>
  All Bookings
</Link>


        {/* Main Form Container */}
        <div ref={formRef} className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Booking Details
                    </h2>
                  </div>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 sm:px-5 py-2 sm:py-2.5 text-white font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-200 text-sm sm:text-base"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {/* Customer Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Customer Name
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Enter customer name"
                        className="w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white transition-all duration-200 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                        {...register("name", {
                          required: "Please enter customer name",
                        })}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                    </div>
                    {errors?.name && (
                      <div className="flex items-center gap-2 mt-2 text-red-600">
                        <div className="w-1 h-4 rounded-full bg-red-500"></div>
                        <span className="text-xs sm:text-sm font-medium">
                          {errors?.name.message}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      Phone Number
                    </label>
                    <div className="relative group">
                      <input
                   type="number"
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white transition-all duration-200 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                        {...register("phoneNumber", {
                          required: "Please enter phone number",
                        })}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                      </div>
                    </div>
                    {errors?.phoneNumber && (
                      <div className="flex items-center gap-2 mt-2 text-red-600">
                        <div className="w-1 h-4 rounded-full bg-red-500"></div>
                        <span className="text-xs sm:text-sm font-medium">
                          {errors?.phoneNumber.message}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      Booking Amount
                    </label>
                    <div className="relative group">
                      <input
                       type="number"
                        placeholder="Enter amount"
                        className="w-full px-4 py-3 sm:py-3.5 border-2 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white transition-all duration-200 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                        {...register("Amount", {
                          required: "Please enter booking amount",
                        })}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                    </div>
                    {errors?.Amount && (
                      <div className="flex items-center gap-2 mt-2 text-red-600">
                        <div className="w-1 h-4 rounded-full bg-red-500"></div>
                        <span className="text-xs sm:text-sm font-medium">
                          {errors?.Amount.message}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Clock className="w-4 h-4 text-purple-600" />
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
                      <div className="flex items-center gap-2 mt-2 text-red-600">
                        <div className="w-1 h-4 rounded-full bg-red-500"></div>
                        <span className="text-xs sm:text-sm font-medium">
                          {errors?.time.message}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 sm:mt-10">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 text-base sm:text-lg hover:cursor-pointer"
                  >
                    Create Booking
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            All booking information will be securely stored in the system
          </p>
        </div>
      </div>
    </div>
  );
};