import React from "react";

interface WhatsAppLinkButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppLinkButtonPricing: React.FC<WhatsAppLinkButtonProps> = ({
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
    <div className="flex justify-center items-center ">

      <button
        onClick={handleClick}
        className="   text-blue-400 text-sm font-bold hover:text-green-600  flex justify-center items-center"
        aria-label="Chat on WhatsApp"
      >
        <p>Chat with us on WhatsApp?</p>

      </button>
   
    </div>
  );
};

export default WhatsAppLinkButtonPricing;
