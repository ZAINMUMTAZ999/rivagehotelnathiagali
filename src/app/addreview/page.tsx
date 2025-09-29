"use client"
import { AddReviewApi } from "../Api";
import { AppContext } from "../context/AppNotify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
// import { addReviewTypes } from "../../../backend/src/models/addReview.models";
import {addReviewTypes} from "../Api";
import { Button } from "../components/ui/button";
import {  Send, ArrowLeft, MessageSquare } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

import { useEffect, useRef } from "react";
import Link from "next/link.js";
import { useRouter } from "next/navigation.js";
// import Toast from "./Toast";

export default function AddReview  () {
  const { showToast } = AppContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
    // reset,
    // handleSubmit,
    
    watch,
  } = useForm<addReviewTypes>();

  const formRef = useRef<HTMLDivElement>(null);
  const message = watch("message", "");
  const characterCount = message?.length || 0;

  // Scroll to top when component mounts - multiple approaches for reliability
  useEffect(() => {
    // Force immediate scroll to absolute top
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Also try setting scroll position on the html element
      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        htmlElement.scrollTop = 0;
      }
    };

    // Execute immediately
    scrollToTop();

    // Execute again after a short delay to ensure it works after React renders
    const timer1 = setTimeout(scrollToTop, 0);
    const timer2 = setTimeout(scrollToTop, 100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
const router=useRouter();
  // const toast=<Toast/>;
  const { mutate: addReview,isPending: isLoading } = useMutation(
    {
        mutationKey:["addReview"],
        mutationFn:AddReviewApi,
         onSuccess: () => {
      showToast({ type: "SUCCESS", message: "Review Added!" });
      // toast();
      // reset(); // clear form
      router.push("/");
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error?.message });
    }
        
    }
 
);

//   const onSubmits = (data: { message: string,name:string }) => {
//     addReview(data);
//   };
  const onSubmits = handleSubmit((data: { message: string,name:string })=>{
    addReview(data)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" style={{ scrollBehavior: 'smooth' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 pt-8 pb-16" id="add-review-top">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h1>
  
          </div>

          {/* Main Form */}
          <div ref={formRef} className="max-w-2xl mx-auto">
            <form onSubmit={onSubmits} className="space-y-8">
              {/* Review Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                  <div className="flex items-center gap-3">
                   
                    <h2 className="text-white text-xl font-semibold">Write Your Review</h2>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Textarea */}
                    <div className="relative">
                      {/* name */}
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Name
                      </label>
                      <div className="relative">
                        <input
                         
                          placeholder="Your Name"
                          className={`w-full p-4 border-2 rounded-xl bg-gray-50 focus:bg-white transition-all duration-300 resize-none text-gray-900 placeholder-gray-500 ${
                            errors?.message 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                          } focus:ring-4 focus:outline-none`}
                          {...register("name", {
                            required: "Please enter your Name for add review it will visible to others!",
                          
                          })}
                        />
                         {errors?.name && (
                        <div className="flex items-center gap-2 mt-2 text-red-600">
                          <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          </div>
                          <span className="text-sm font-medium">{errors?.name.message}</span>
                        </div>
                      )}
                        {/* meesage */}
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Your Review
                      </label>
                      <div className="relative">
                        <textarea
                          minLength={1}
                          maxLength={500}
                          rows={6}
                          placeholder="Tell us about your experience... What did you love? What could be improved?"
                          className={`w-full p-4 border-2 rounded-xl bg-gray-50 focus:bg-white transition-all duration-300 resize-none text-gray-900 placeholder-gray-500 ${
                            errors?.message 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                          } focus:ring-4 focus:outline-none`}
                          {...register("message", {
                            required: "Please share your thoughts with us",
                            minLength: {
                              value: 10,
                              message: "Please write at least 10 characters"
                            }
                          })}
                        />
                        
                        {/* Character Counter */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                          <span className={`text-xs font-medium ${
                            characterCount > 180 ? 'text-orange-500' : 
                            characterCount > 160 ? 'text-yellow-500' : 'text-gray-400'
                          }`}>
                            {characterCount}/500
                          </span>
                        </div>
                      </div>
                      
                      {errors?.message && (
                        <div className="flex items-center gap-2 mt-2 text-red-600">
                          <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          </div>
                          <span className="text-sm font-medium">{errors.message.message}</span>
                        </div>
                      )}
                    </div>

                   
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                   
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading || characterCount === 0}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
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
                </div>
              </div>
            </form>
          </div>

          {/* Bottom Section */}
          
        </div>
      </div>

     
    </div>
  );
};