"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AddReviewEachHotelById, addReviewTypes } from "../../../Api";
import { AppContext } from "../../../context/AppNotify";
import { Button } from "../../../components/ui/button";
import { Send, MessageSquare } from "lucide-react";

export default function AddReviewById ()  {
const { id } = useParams<{ id: string }>();
console.log("idADDREVIEW",id)


  // ✅ toast context
  const { showToast } = AppContext();

  const queryClient = useQueryClient();
  const formRef = useRef<HTMLDivElement>(null);

  // ✅ react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<addReviewTypes>();

  const message = watch("message", "");
  const characterCount = message?.length ?? 0;

  const router=useRouter();
  // ✅ mutation to add a review

  const { mutate: addReview, isPending } = useMutation({
    mutationFn: (data: { id: string; name: string; message: string }) =>
      AddReviewEachHotelById(data.id, {
        name: data.name,
        message: data.message,
      }),
    onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ["getReviewsByID", id] });

      showToast({ type: "SUCCESS", message: "Review Added" });
router.push(`/allrooms/${id}`)
      reset();
    },
  onError: (error:Error) => {
      showToast({ type: "ERROR", message: error?.message });

    },
  });

  // ✅ form submit
  const onSubmit = (data: addReviewTypes) => {
    addReview({
      id,
      name: data.name,
      message: data.message,
    });
  };

  // Optional scroll-to-top when mounting
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
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div
          className="relative max-w-4xl mx-auto px-6 pt-8 pb-16"
          id="add-review-top"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h1>
          </div>

          {/* Form */}
          <div ref={formRef} className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                  <h2 className="text-white text-xl font-semibold">
                    Write Your Review
                  </h2>
                </div>

                {/* Card Body */}
                <div className="p-8 space-y-6">
                  {/* Name */}
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Name
                  </label>
                  <input
                    placeholder="Your Name"
                    className={`w-full p-4 border-2 rounded-xl bg-gray-50 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500 ${
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
                    <p className="mt-2 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}

                  {/* Review */}
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Your Review
                  </label>
                  <div className="relative">
                    <textarea
                      minLength={10}
                      maxLength={500}
                      rows={6}
                      placeholder="Tell us about your experience..."
                      className={`w-full p-4 border-2 rounded-xl bg-gray-50 focus:bg-white transition-all duration-300 resize-none text-gray-900 placeholder-gray-500 ${
                        errors?.message
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      } focus:ring-4 focus:outline-none`}
                      {...register("message", {
                        required: "Please share your thoughts with us",
                        minLength: {
                          value: 10,
                          message: "Please write at least 10 characters",
                        },
                      })}
                    />
                    <span
                      className={`absolute bottom-3 right-3 text-xs font-medium ${
                        characterCount > 180
                          ? "text-orange-500"
                          : characterCount > 160
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    >
                      {characterCount}/500
                    </span>
                  </div>
                  {errors?.message && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                  <Button
                    type="submit"
                    disabled={isPending || characterCount === 0}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
};
