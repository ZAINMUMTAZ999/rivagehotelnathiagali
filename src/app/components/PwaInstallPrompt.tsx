"use client";

import { useEffect, useState } from "react";

export default function PwaInstallPrompt() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
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
    <div className="fixed top-10 right-8 bg-gray-500 p-2 shadow-xl rounded-4xl flex items-center gap-0 z-50">
      <span className="font-serif text-white">
        Install Application for faster access!
      </span>
      <button
        onClick={handleInstall}
        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer"
      >
        Install
      </button> 
    </div>
  );
}
