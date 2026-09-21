"use client";

import { addReviewTypes, GetAllReviewsApi } from "../Api";
import { useRef, useState } from "react";
import { X, Plus, UserIcon, Star, User } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function GetallReviews() {
  const [selectedReview, setSelectedReview] =
    useState<addReviewTypes | null>(null);

  const {
    data: reviewsData,
    isLoading,
    isError,
    error,
  } = useQuery<addReviewTypes[], Error>({
    queryKey: ["reviews"],
    queryFn: GetAllReviewsApi,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const MAX_MESSAGE_LENGTH = 120;

  /* Loading */
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-8 sm:mt-10 md:mt-12">
        <div className="animate-pulse">
          <div className="h-7 sm:h-8 bg-gray-200 rounded w-48 sm:w-64 mb-6" />

          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[85vw] sm:w-[320px] h-48 bg-gray-200 rounded-xl"
              />
            ))}
          </div>
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
            Failed to load reviews
          </p>

          <p className="text-red-500 text-sm mt-1 break-words">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  /* No Reviews */
  if (!reviewsData || reviewsData.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-8 sm:mt-10 md:mt-12">
        <div className="text-center py-10 sm:py-12">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
          </div>

          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
            No reviews yet
          </h3>

          <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
            Be the first to share your experience!
          </p>

          <Link
            href="/addreview"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Star className="w-5 h-5" />
            Write First Review
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-8 sm:mt-10 md:mt-12 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Customer Reviews
          </h2>

          <p className="text-sm sm:text-base text-gray-600">
            See what our community is saying
          </p>
        </div>

        {/* Add Review Button */}
        <div className="w-full sm:w-auto flex justify-start sm:justify-end">
          <Link
            href="/addreview"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-slate-500 active:scale-95 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl font-medium sm:font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add Review</span>
          </Link>
        </div>
      </div>

      {/* Full Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl relative p-4 sm:p-6">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
              aria-label="Close review"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg sm:text-xl font-semibold mb-4 pr-8 text-gray-900">
              Full Review
            </h3>

            <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line leading-relaxed break-words">
              {selectedReview.message}
            </p>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div
        ref={containerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
      >
        {reviewsData.map((review) => {
          const isLong =
            review.message.length > MAX_MESSAGE_LENGTH;

          return (
            <div
              key={review._id}
              className="flex-shrink-0 w-[85vw] sm:w-[320px] bg-white border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200"
            >
              {/* User */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0">
                  <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </div>

                <h4 className="font-semibold text-sm sm:text-base text-gray-900 break-words">
                  {review.name}
                </h4>
              </div>

              {/* Review */}
              <div className="space-y-3">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">
                  {isLong
                    ? `${review.message.slice(
                        0,
                        MAX_MESSAGE_LENGTH
                      )}...`
                    : review.message}
                </p>

                {isLong && (
                  <button
                    onClick={() => setSelectedReview(review)}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700 hover:underline transition-colors"
                  >
                    Read more
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}