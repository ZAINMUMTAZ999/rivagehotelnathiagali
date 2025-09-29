"use client"
// import { GetAllReviewsApi } from "../Api";
// import { addReviewTypes } from "../../../backend/src/models/addReview.models";
import {addReviewTypes, GetAllReviewsApi} from "../Api";
// import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {   X, Plus, UserIcon, Star, User } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";


export default function GetallReviews  () {
  const [selectedReview, setSelectedReview] = useState<addReviewTypes | null>(null);

const { data: reviewsData, isLoading, isError, error } = useQuery<addReviewTypes[], Error>({
  queryKey: ["reviews"],
  queryFn: GetAllReviewsApi,
  // staleTime: 1000 * 60, // 1 minute cache (optional)
  // retry: 2,            // retry twice on error (optional)
});

  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  const MAX_MESSAGE_LENGTH = 120;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="flex space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[320px] h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Failed to load reviews</p>
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!reviewsData || reviewsData.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-500 mb-8">Be the first to share your experience!</p>

          <Link
            href="/addreview"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Star className="w-5 h-5" />
            Write First Review
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-12 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Customer Reviews</h2>
          <p className="text-gray-600">See what our community is saying</p>
        </div>
<div className="w-full flex justify-end">
  <Link
    href="/addreview"
    className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white
    px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3
    text-sm sm:text-base
    rounded-lg sm:rounded-xl
    font-medium sm:font-semibold
    shadow-md hover:shadow-lg
    transition-all duration-200"
  >
    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
    <span>Add Review</span>
  </Link>
</div>


      </div>

      {/* Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl relative p-4 sm:p-6">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Full Review</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{selectedReview.message}</p>
          </div>
        </div>
      )}

      {/* Scroll buttons - hidden on xs */}
      {/* <span className="flex items-center justify-center">
        
      </span> */}
      <button
        onClick={() => scroll("left")}
        className=" sm:flex absolute 
 
        left-2 top-1/2 -translate-y-1/2 z-10 mt-12 -ml-4 bg-white hover:bg-gray-50 shadow-lg border border-gray-200 w-10 h-10 rounded-full items-center justify-center transition-all duration-200"
      >
        <span className="text-gray-600 text-lg ">←</span>
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-2 top-1/2 mt-12  -ml-4 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 shadow-lg border border-gray-200 w-10 h-10 rounded-full items-center justify-center  transition-all duration-200"
      >
        <span className="text-gray-600 text-lg ">→</span>
      </button>

      {/* Reviews list */}
      <div
        ref={containerRef}
        className="flex space-x-4 md:space-x-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
      >
       {reviewsData.map((review) => {
          const isLong = review.message.length > MAX_MESSAGE_LENGTH;

          return (
            <div
              key={review._id}
              className="w-[90vw] sm:w-[320px] bg-white border border-gray-200 rounded-xl p-4 md:p-6 flex-shrink-0 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    {review.name}
                  </h4>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {isLong ? `${review.message.slice(0, MAX_MESSAGE_LENGTH)}...` : review.message}
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
};
