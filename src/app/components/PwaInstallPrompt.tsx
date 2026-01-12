/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
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
    <div className=" bottom-5 right-5 bg-gray-400 p-4 shadow-xl rounded-xl flex items-center gap-3 z-50">
      <span className="font-normal font-serif text-black">
        Install Application for Mobile!
      </span>
      <button
        onClick={handleInstall}
        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Install
      </button>
    </div>
  );
}
