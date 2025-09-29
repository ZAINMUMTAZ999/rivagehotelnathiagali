"use client"
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

import {  contactUsApi } from "../Api";
import { AppContext } from "../context/AppNotify";
import { Button } from "../components/ui/button";

import WhatsAppLinkButton from "../components/WA";
import { useRouter } from "next/navigation";
// import { Button } from "../components/ui/button";
// import WhatsAppLinkButton from "@/components/WA";

export type contactUsTypes = {
userId: string;
_id:string;
name: string;
email: string;
phoneNumber: number;
interestedIn: string;
message: string;

};
// Placeholder for your decorative background elements for cleaner code
const ContactBackground = () => (
  <>
    {/* This is where your background, plus pattern, and robot images would go */}
    <div className="absolute top-0 left-0 w-full h-full opacity-50 /* your pattern styles */" />
  </>
);

export default function ContactUS () {
  const {showToast}=AppContext();
  const router = useRouter();


  const {
register,
    handleSubmit,
    formState: { errors },

  } = useForm<contactUsTypes>();

  const { mutate: apiMutate, isPending:isLoading } = useMutation(
    
    {
      mutationKey:["contact"],
      mutationFn:contactUsApi,
       onSuccess: () => {
      showToast({ message: "Message sent successfully!", type: "SUCCESS" });
      router.push("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
    }
  //   contactUsApi, {
  //  
  // }
);

  const onSubmits = handleSubmit((data) => apiMutate(data));

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <ContactBackground />
           {/* Fixed WhatsApp Button - Positioned as floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppLinkButton 
          phoneNumber="923289330350" 
          message="Hi, I'm interested in your services!" 
        />
      </div>

      {/* Main content container with responsive padding and centering */}
      {/* Changed to lg:flex-row for better tablet/desktop transition */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-center relative z-10 gap-12 lg:gap-16">
        
        {/* === Left Side: Contact Info & Title === */}
        {/*
          * hidden: Hides this block by default (on small screens).
          * md:block: Makes it visible as a block element on medium screens (768px) and up.
        */}
        <div className="hidden md:block w-full lg:w-5/12 text-center lg:text-left">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tighter">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
              Have a project in mind or just want to say hi? We&apos;d love to hear from you!
            </p>
          </div>
          <div className="space-y-6 flex flex-col items-center lg:items-start">
            
            {/* Clickable Phone Number */}
            <a href="tel:+923246288217" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-gray-700 font-medium text-base sm:text-lg group-hover:text-pink-600 transition-colors">
               +92 328 9330350
              </span>
            </a>

            {/* Clickable Email Address */}
            <a   href="mailto:mzainmumtaz99@gmail.com" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-gray-700 font-medium text-base sm:text-lg group-hover:text-purple-600 transition-colors">
   awaissardar944@gmail.com
              </span>
            </a>

            {/* Address (not clickable) */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-gray-700 font-medium text-base sm:text-lg">Upper Nathia Gali Rd, Nathia Gali, 22280, Pakistan</span>
            </div>
          </div>
        </div>

        {/* === Right Side: Contact Form === */}
        {/* On small screens, this form will take up the full width since the left column is hidden */}
        <form 
        onSubmit={onSubmits}
        className="w-full lg:w-7/12 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl">
           {/* Mobile-only Header */}
           <div className="md:hidden text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tighter">Contact Us</h1>
           </div>
          <div className="space-y-6">
            {/* Form inputs remain the same... */}
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input id="name" type="text" {...register("name", { required: "Full name is required" })} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base" placeholder="Enter your full name" />
              {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input id="email" type="email" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base" placeholder="name@gamil.com" />
                {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                <input id="phoneNumber" type="tel" {...register("phoneNumber", { required: "Phone number is required" })} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base" placeholder="(123) 456-7890" />
                {errors.phoneNumber && <span className="text-red-500 text-sm mt-1 block">{errors.phoneNumber.message}</span>}
              </div>
            </div>

            {/* <div>
              <label htmlFor="interestedIn" className="block text-gray-700 text-sm font-bold mb-2">Service of Interest</label>
              <input id="interestedIn" type="text" {...register("interestedIn", { required: "This field is required" })} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base" placeholder="e.g., Web Development, SEO" />
              {errors.interestedIn && <span className="text-red-500 text-sm mt-1 block">{errors.interestedIn.message}</span>}
            </div> */}

            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea id="message" {...register("message", { required: "Message is required" })} rows={5} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-base" placeholder="Write your message here..." />
              {errors.message && <span className="text-red-500 text-sm mt-1 block">{errors.message.message}</span>}
            </div>

            <Button type="submit" 
            disabled={isLoading}
             className="w-full py-3 text-base font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer">
              {isLoading ? "Sending..." : "Send Message"}
              
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

