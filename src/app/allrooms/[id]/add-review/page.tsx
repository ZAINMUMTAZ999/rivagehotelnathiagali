"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AddReviewEachHotelById, addReviewTypes } from "../../../Api";
import { AppContext } from "../../../context/AppNotify";
import { Button } from "../../../components/ui/button";
import { Send, MessageSquare } from "lucide-react";

export default function AddReviewById() {
  const { id } = useParams<{ id: string }>();

  const { showToast } = AppContext();

  const queryClient = useQueryClient();
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<addReviewTypes>();

  const message = watch("message", "");
  const characterCount = message?.length ?? 0;

  const { mutate: addReview, isPending } = useMutation({
    mutationFn: (data: { id: string; name: string; message: string }) =>
      AddReviewEachHotelById(data.id, {
        name: data.name,
        message: data.message,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getReviewsByID", id],
      });

      showToast({
        type: "SUCCESS",
        message: "Review Added",
      });

      router.push(`/allrooms/${id}`);
      reset();
    },

    onError: (error: Error) => {
      showToast({
        type: "ERROR",
        message: error?.message,
      });
    },
  });

  const onSubmit = (data: addReviewTypes) => {
    addReview({
      id,
      name: data.name,
      message: data.message,
    });
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();

    const t1 = setTimeout(scrollToTop, 0);
    const t2 = setTimeout(scrollToTop, 100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative overflow-hidden">

        {/* Background Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-[-100px] sm:top-20 sm:left-10 md:left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />

          <div className="absolute top-32 right-[-100px] sm:top-40 sm:right-10 md:right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />

          <div className="absolute -bottom-8 left-10 sm:left-20 md:left-40 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        {/* Main Content */}
        <div
          className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-10 sm:pb-16"
          id="add-review-top"
        >

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">

            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 px-2">
              Share Your Experience
            </h1>
          </div>

          {/* Form */}
          <div ref={formRef} className="w-full max-w-2xl mx-auto">

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 sm:space-y-8"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 md:px-8 py-5 sm:py-6">
                  <h2 className="text-white text-lg sm:text-xl font-semibold">
                    Write Your Review
                  </h2>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-6 md:p-8">

                  <div className="space-y-5 sm:space-y-6">

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        Name
                      </label>

                      <input
                        type="text"
                        placeholder="Your Name"
                        className={`w-full p-3 sm:p-4 border-2 rounded-xl bg-gray-50 focus:bg-white transition-all duration-300 text-sm sm:text-base text-gray-900 placeholder-gray-500 ${
                          errors?.name
                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                        } focus:ring-4 focus:outline-none`}
                        {...register("name", {
                          required:
                            "Please enter your Name for add review it will visible to others!",
                        })}
                      />

                      {errors?.name && (
                        <p className="mt-2 text-xs sm:text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Review */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        Your Review
                      </label>

                      <div className="relative">
                        <textarea
                          minLength={10}
                          maxLength={500}
                          rows={6}
                          placeholder="Tell us about your experience..."
                          className={`w-full p-3 sm:p-4 pb-9 border-2 rounded-xl bg-gray-50 focus:bg-white transition-all duration-300 resize-none text-sm sm:text-base text-gray-900 placeholder-gray-500 ${
                            errors?.message
                              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                              : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                          } focus:ring-4 focus:outline-none`}
                          {...register("message", {
                            required: "Please share your thoughts with us",
                            minLength: {
                              value: 10,
                              message:
                                "Please write at least 10 characters",
                            },
                          })}
                        />

                        <span
                          className={`absolute bottom-3 right-3 text-xs font-medium ${
                            characterCount > 450
                              ? "text-red-500"
                              : characterCount > 400
                              ? "text-orange-500"
                              : "text-gray-400"
                          }`}
                        >
                          {characterCount}/500
                        </span>
                      </div>

                      {errors?.message && (
                        <p className="mt-2 text-xs sm:text-sm text-red-600">
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 sm:px-6 md:px-8 py-5 sm:py-6 border-t border-gray-100">

                  <Button
                    type="submit"
                    disabled={isPending || characterCount === 0}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Add Review</span>
                      </>
                    )}
                  </Button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}