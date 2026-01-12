/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; 

import { useEffect, useState } from "react";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault(); // Prevent automatic browser popup
      setDeferredPrompt(e);
      setShowBanner(true); // Show our custom install banner
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt(); // Show browser install popup
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the PWA install");
    } else {
      console.log("User dismissed the install");
    }

    setDeferredPrompt(null);
    setShowBanner(false); // Hide banner after user decision
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-white p-4 shadow-xl rounded-xl flex items-center gap-3 z-50">
      <span className="font-medium text-gray-800">Install HotelWebApp for faster access!</span>
      <button
        onClick={handleInstall}
        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Install
      </button>
    </div>
  );
}
