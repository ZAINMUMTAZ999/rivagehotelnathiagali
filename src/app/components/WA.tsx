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
    window.open(url, "_blank");
  };

  return (
    // hidden on md+ screens, visible only on small devices
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <div className="relative group">
        {/* Floating Action Button */}
        <button
          onClick={handleClick}
          className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center animate-pulse hover:animate-none"
          aria-label="Chat on WhatsApp"
        >
          <FaSquareWhatsapp size={42} />
        </button>

        {/* Tooltip (appears on hover) */}
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
          <span className="font-medium">Chat with us on WhatsApp</span>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppLinkButton;

// import React from "react";
// import { FaSquareWhatsapp } from "react-icons/fa6";
// interface WhatsAppLinkButtonProps {
//   phoneNumber: string;
//   message?: string;
// }

// const WhatsAppLinkButton: React.FC<WhatsAppLinkButtonProps> = ({
//   phoneNumber,
//   message = "Hello!",
// }) => {
//   const handleClick = () => {
//     const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <div className="relative group">
//       {/* Floating Action Button */}
//       <button
//         onClick={handleClick}
//         className="relative bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center animate-pulse hover:animate-none overflow-hidden group"
//         aria-label="Chat on WhatsApp"
//       >
//         <FaSquareWhatsapp size={48} />
//       </button>
//       <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
//         <span className="font-medium">Chat with us on WhatsApp</span>
//       </div>
//     </div>
//   );
// };

// export default WhatsAppLinkButton;
