"use client";
import { useEffect, useState } from "react";

export default function PwaInstallPrompt() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Listen for PWA install prompt
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log(
      choiceResult.outcome === "accepted"
        ? "User accepted the install"
        : "User dismissed the install"
    );

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className=" absolute top-24  right-16 z-50 bg-gray-600 text-white p-3 shadow-lg rounded-3xl flex items-center gap-3 animate-slide-in">
      <span className="font-medium">
        Install APP!
      </span>
      <button
        onClick={handleInstall}
        className="px-4 font-serif py-1 bg-blue-600 rounded-lg hover:bg-blue-700 hover:cursor-pointer transition"
      >
        Install
      </button>
      <button
        onClick={() => setShowBanner(false)}
        className="ml-2 text-lg size-5 font-sans text-gray-300  hover:cursor-pointer"
      >
 X
      </button>
    </div>
  );
}
