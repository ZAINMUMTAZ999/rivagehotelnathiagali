
"use client";

import { useEffect, useState } from "react";
import { verifyPayment } from "../../Api";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Home,
  Sparkles,
} from "lucide-react";

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(
    "Verifying your payment..."
  );

  useEffect(() => {
    const verify = async () => {
      try {
        // Get Stripe Checkout Session ID from URL
        const params = new URLSearchParams(
          window.location.search
        );

        const sessionId = params.get("session_id");

        if (!sessionId) {
          throw new Error("Payment session ID is missing");
        }

        // Call your Express backend
        const data = await verifyPayment(sessionId);

        if (data.paymentStatus !== "PAID") {
          throw new Error("Payment has not been confirmed");
        }

        setSuccess(true);
        setMessage("Your hotel booking is confirmed!");

      } catch (error) {
        setSuccess(false);

        setMessage(
          error instanceof Error
            ? error.message
            : "Payment verification failed"
        );

      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#080D1B] px-4 py-12 sm:px-6">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "35px 35px",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_25px_100px_rgba(0,0,0,0.45)]">

          {/* Top Accent */}
          <div
            className={`h-1.5 w-full ${
              loading
                ? "bg-blue-500"
                : success
                ? "bg-emerald-500"
                : "bg-red-500"
            }`}
          />

          <div className="px-6 py-12 sm:px-10 sm:py-14 text-center">

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-10"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>

              <span className="text-white font-semibold tracking-wide text-sm">
                SECURE BOOKING
              </span>
            </motion.div>

            {/* Animated Status Icon */}
            <div className="relative flex justify-center mb-8">

              {loading && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute w-28 h-28 rounded-full border border-blue-400/40"
                  />

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-24 h-24 rounded-full border-4 border-blue-400/10 border-t-blue-400"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Clock className="w-9 h-9 text-blue-400" />
                    </div>
                  </motion.div>
                </>
              )}

              <AnimatePresence mode="wait">
                {!loading && (
                  <motion.div
                    key={success ? "success" : "error"}
                    initial={{ scale: 0, rotate: -30, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 12,
                    }}
                    className={`w-24 h-24 rounded-full flex items-center justify-center ${
                      success
                        ? "bg-emerald-500/10 border border-emerald-400/30"
                        : "bg-red-500/10 border border-red-400/30"
                    }`}
                  >
                    {success ? (
                      <CheckCircle2 className="w-14 h-14 text-emerald-400" />
                    ) : (
                      <XCircle className="w-14 h-14 text-red-400" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={loading ? "loading" : success ? "success" : "error"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                  {loading
                    ? "Verifying Payment"
                    : success
                    ? "Payment Successful!"
                    : "Verification Failed"}
                </h1>

                <p className="text-sm sm:text-base text-slate-400 leading-7 max-w-sm mx-auto">
                  {message}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Status Indicator */}
            <div className="mt-8 flex justify-center">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide border ${
                  loading
                    ? "bg-blue-500/10 border-blue-400/20 text-blue-300"
                    : success
                    ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-300"
                    : "bg-red-500/10 border-red-400/20 text-red-300"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    loading
                      ? "bg-blue-400 animate-pulse"
                      : success
                      ? "bg-emerald-400"
                      : "bg-red-400"
                  }`}
                />

                {loading
                  ? "SECURELY VERIFYING"
                  : success
                  ? "PAYMENT VERIFIED"
                  : "VERIFICATION ERROR"}
              </div>
            </div>

            {/* Action Button */}
            <AnimatePresence>
              {!loading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-10"
                >
                  <Link
                    href="/"
                    className="group w-full inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-4 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:-translate-y-1 active:translate-y-0"
                  >
                    <Home className="w-5 h-5" />

                    Back to Home

                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Protected by secure payment verification</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-slate-500 text-xs mt-6"
        >
          Thank you for choosing us for your stay.
        </motion.p>

      </motion.div>
    </main>
  );
}
