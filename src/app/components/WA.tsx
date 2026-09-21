"use client";

import React from "react";
import { FaSquareWhatsapp } from "react-icons/fa6";

interface WhatsAppLinkButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppLinkButton: React.FC<WhatsAppLinkButtonProps> = ({
  phoneNumber,
  message = "Hello!",
}) => {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-30">
      <div className="relative group">

        {/* Floating WhatsApp Button */}
        <button
          type="button"
          onClick={handleClick}
          aria-label="Chat on WhatsApp"
          className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse hover:animate-none"
        >
          <FaSquareWhatsapp className="w-9 h-9 sm:w-[42px] sm:h-[42px]" />
        </button>

        {/* Tooltip */}
        <div className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 hidden sm:block bg-gray-900 text-white text-xs sm:text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          <span className="font-medium">
            Chat with us on WhatsApp
          </span>
        </div>

      </div>
    </div>
  );
};

export default WhatsAppLinkButton;