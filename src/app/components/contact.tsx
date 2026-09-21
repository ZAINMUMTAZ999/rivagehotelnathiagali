"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactUsApi } from "../Api";
import { AppContext } from "../context/AppNotify";
import { Button } from "../components/ui/button";
import WhatsAppLinkButton from "../components/WA";
import { useRouter } from "next/navigation";

export type contactUsTypes = {
  userId: string;
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
  interestedIn: string;
  message: string;
};

const ContactBackground = () => (
  <div className="absolute inset-0 opacity-50 pointer-events-none" />
);

export default function ContactUS() {
  const { showToast } = AppContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contactUsTypes>();

  const { mutate: apiMutate, isPending: isLoading } = useMutation({
    mutationKey: ["contact"],
    mutationFn: contactUsApi,

    onSuccess: () => {
      showToast({
        message: "Message sent successfully!",
        type: "SUCCESS",
      });

      router.push("/");
    },

    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmits = handleSubmit((data) => apiMutate(data));

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">

      <ContactBackground />

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <WhatsAppLinkButton
          phoneNumber="923289330350"
          message="Hi, I'm interested in your services!"
        />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-16 relative z-10">
   {/* Contact Form */}
        <form
          onSubmit={onSubmits}
          className="w-full lg:w-7/12 bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-2xl"
        >

          {/* Form Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Contact Us
            </h2>
          </div>

          <div className="space-y-5 sm:space-y-6">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 sm:p-3.5 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                {...register("name", {
                  required: "Full name is required",
                })}
              />

              {errors.name && (
                <span className="text-red-500 text-xs sm:text-sm mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="name@gmail.com"
                  className="w-full p-3 sm:p-3.5 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />

                {errors.email && (
                  <span className="text-red-500 text-xs sm:text-sm mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Phone
                </label>

                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="(123) 456-7890"
                  className="w-full p-3 sm:p-3.5 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />

                {errors.phoneNumber && (
                  <span className="text-red-500 text-xs sm:text-sm mt-1 block">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Message
              </label>

              <textarea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                className="w-full p-3 sm:p-3.5 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm sm:text-base"
                {...register("message", {
                  required: "Message is required",
                })}
              />

              {errors.message && (
                <span className="text-red-500 text-xs sm:text-sm mt-1 block">
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-sm sm:text-base font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>

          </div>
        </form>
        {/* Contact Information */}
        <div className="w-full lg:w-5/12 text-center lg:text-left">

          <div className="mb-8 sm:mb-10">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
              Get in Touch
            </h1>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
              Have a project in mind or just want to say hi? We would love to hear
              from you!
            </p>

          </div>

          {/* Contact Details */}
          <div className="space-y-5 sm:space-y-6 flex flex-col items-center lg:items-start">

            {/* Phone */}
            <a
              href="tel:+923246288217"
              className="flex items-center gap-3 sm:gap-4 group w-full max-w-sm lg:max-w-none"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <span className="text-gray-700 font-medium text-sm sm:text-base md:text-lg group-hover:text-pink-600 transition-colors break-all">
                +92 324 6288217
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:mzainmumtaz99@gmail.com"
              className="flex items-center gap-3 sm:gap-4 group w-full max-w-sm lg:max-w-none"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <span className="text-gray-700 font-medium text-sm sm:text-base md:text-lg group-hover:text-purple-600 transition-colors break-all">
                mzainmumtaz99@gmail.com
              </span>
            </a>

            {/* Address */}
            <div className="flex items-center gap-3 sm:gap-4 w-full max-w-sm lg:max-w-none">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <span className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
                Islamabad, Pakistan
              </span>
            </div>

          </div>
        </div>

     

      </div>
    </main>
  );
}