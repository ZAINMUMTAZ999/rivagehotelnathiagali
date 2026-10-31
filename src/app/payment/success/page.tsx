"use client";

import { useEffect, useState } from "react";
import { verifyPayment } from "../../Api";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleHelp,
  CreditCard,
  House,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type PaymentStatus = "loading" | "success" | "error";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [message, setMessage] = useState(
    "Verifying your payment with our booking system..."
  );
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let isActive = true;

    const verify = async () => {
      setStatus("loading");
      setMessage("Verifying your payment with our booking system...");

      const params = new URLSearchParams(window.location.search);
      const currentSessionId = params.get("session_id");
      setSessionId(currentSessionId);

      if (!currentSessionId) {
        if (isActive) {
          setStatus("error");
          setMessage(
            "We couldn't find a payment session in this page's address. Your booking has not been confirmed here."
          );
        }
        return;
      }

      try {
        // The redirect alone is not treated as proof of payment.
        // The backend must confirm that the Stripe session is PAID.
        const data = await verifyPayment(currentSessionId);

        if (data?.paymentStatus !== "PAID") {
          throw new Error(
            "Your payment has not been confirmed yet. Please try again in a moment."
          );
        }

        if (isActive) {
          setStatus("success");
          setMessage(
            "Your payment is verified and your hotel booking is confirmed."
          );
        }
      } catch (error) {
        if (isActive) {
          setStatus("error");
          setMessage(
            error instanceof Error
              ? error.message
              : "We couldn't verify your payment. Please try again or contact the booking team."
          );
        }
      }
    };

    void verify();

    return () => {
      isActive = false;
    };
  }, [attempt]);

  const copy = {
    loading: {
      eyebrow: "SECURE PAYMENT CHECK",
      title: "We're confirming your booking",
      description:
        "Just a moment. We're checking your payment securely before showing your final booking status.",
      badge: "Verification in progress",
    },
    success: {
      eyebrow: "YOU'RE ALL SET",
      title: "Your booking is confirmed",
      description:
        "The payment has been verified successfully. You're all set to continue your journey.",
      badge: "Booking confirmed",
    },
    error: {
      eyebrow: "ACTION MAY BE NEEDED",
      title: "We couldn't confirm your payment",
      description:
        "Your booking is not marked as confirmed on this page. Check the details below and try verification again.",
      badge: "Confirmation needed",
    },
  }[status];

  const stepOne =
    status === "success"
      ? "complete"
      : status === "loading"
        ? "active"
        : "attention";

  const stepTwo =
    status === "success"
      ? "complete"
      : "waiting";

  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#F3F6FB] text-[#17243A]">

      {/* Soft ambient background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-36 -top-40 h-[360px] w-[360px] rounded-full bg-[#DCE9FF] opacity-70 blur-3xl sm:h-[480px] sm:w-[480px]" />

        <div className="absolute -bottom-48 -right-40 h-[380px] w-[380px] rounded-full bg-[#E3ECFA] opacity-80 blur-3xl sm:h-[520px] sm:w-[520px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(28,66,122,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(28,66,122,0.025)_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

   
      {/* Main content */}
      <section className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-3 py-6 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10">

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: easeOut,
          }}
          className="mx-auto w-full max-w-[1080px]"
        >

          {/* Small page context */}
          <div className="mb-4 flex items-center justify-between px-1 sm:mb-6 sm:px-2">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#8290A5] sm:text-xs">
              <span>Checkout</span>

              <span className="h-1 w-1 rounded-full bg-[#B7C3D3]" />

              <span className="text-[#315B96]">
                Confirmation
              </span>
            </div>

            <div className="hidden items-center gap-1.5 text-xs font-medium text-[#8290A5] sm:flex">
              <LockKeyhole className="h-3.5 w-3.5" />
              Protected transaction
            </div>
          </div>

          <div className="grid items-stretch gap-4 sm:gap-5 md:grid-cols-[minmax(0,1.42fr)_minmax(270px,0.78fr)] md:gap-6 lg:gap-7">

            {/* Main confirmation panel */}
            <motion.section
              layout
              className="relative min-w-0 overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_18px_65px_rgba(20,48,86,0.09)] sm:rounded-[30px]"
              aria-live="polite"
            >

              {/* Premium blue hero */}
              <div className="relative isolate overflow-hidden bg-[linear-gradient(118deg,#073B87_0%,#0755C9_54%,#2678E8_100%)] px-5 pb-7 pt-6 text-white sm:px-8 sm:pb-9 sm:pt-8 md:px-9 md:pb-10 md:pt-9">

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
                >
                  <motion.div
                    className="absolute -right-16 -top-32 h-[270px] w-[270px] rounded-full border border-white/10 sm:-right-8 sm:-top-40 sm:h-[360px] sm:w-[360px]"
                    animate={
                      reduceMotion ? undefined : { rotate: 360 }
                    }
                    transition={{
                      duration: 46,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="absolute -right-3 -top-20 h-[205px] w-[205px] rounded-full border border-white/[0.09] sm:right-8 sm:-top-24 sm:h-[275px] sm:w-[275px]"
                    animate={
                      reduceMotion ? undefined : { rotate: -360 }
                    }
                    transition={{
                      duration: 58,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="absolute -bottom-24 left-[28%] h-52 w-52 rounded-full bg-[#62A5FF]/20 blur-3xl" />

                  <div className="absolute right-[22%] top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

                  <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.055)_48%,transparent_70%)]" />
                </div>

                <div className="relative flex flex-col gap-5 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between sm:gap-8">

                  <div className="min-w-0 flex-1">

                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-extrabold tracking-[0.17em] text-blue-50/95 backdrop-blur-md sm:mb-4 sm:text-[10px]">

                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          status === "success"
                            ? "bg-[#83F0B8]"
                            : status === "error"
                              ? "bg-[#FFD2CF]"
                              : "bg-[#BBD8FF]"
                        }`}
                      />

                      {copy.eyebrow}
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={status}
                        initial={
                          reduceMotion
                            ? false
                            : { opacity: 0, y: 10 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          reduceMotion
                            ? undefined
                            : { opacity: 0, y: -7 }
                        }
                        transition={{
                          duration: reduceMotion ? 0 : 0.28,
                          ease: easeOut,
                        }}
                      >
                        <h1 className="max-w-[570px] text-[27px] font-extrabold leading-[1.12] tracking-[-0.055em] text-white min-[380px]:text-[30px] sm:text-[36px] md:text-[39px] lg:text-[43px]">
                          {copy.title}
                        </h1>

                        <p className="mt-3 max-w-[520px] text-[13px] leading-[1.75] text-blue-50/85 min-[380px]:text-sm sm:mt-4 sm:text-[15px] sm:leading-7">
                          {copy.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Animated status mark */}
                  <div className="relative flex h-[82px] w-[82px] shrink-0 items-center justify-center self-start min-[480px]:self-center sm:h-[104px] sm:w-[104px] md:h-[112px] md:w-[112px]">

                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-white/20"
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              scale: [1, 1.08, 1],
                              opacity: [0.55, 0.2, 0.55],
                            }
                      }
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <div className="absolute inset-[9px] rounded-full border border-white/20 bg-white/[0.09] shadow-[inset_0_0_28px_rgba(255,255,255,0.08)] backdrop-blur-sm sm:inset-[11px]" />

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={status}
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                scale: 0.65,
                                rotate: -12,
                              }
                        }
                        animate={{
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                        }}
                        exit={
                          reduceMotion
                            ? undefined
                            : {
                                opacity: 0,
                                scale: 0.7,
                              }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 230,
                          damping: 17,
                        }}
                        className={`relative z-10 flex h-[53px] w-[53px] items-center justify-center rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.16)] sm:h-[68px] sm:w-[68px] ${
                          status === "success"
                            ? "bg-[#18A66A] text-white"
                            : status === "error"
                              ? "bg-[#D94D58] text-white"
                              : "bg-white text-[#0755C9]"
                        }`}
                      >
                        {status === "loading" ? (
                          <motion.div
                            animate={
                              reduceMotion
                                ? undefined
                                : { rotate: 360 }
                            }
                            transition={{
                              duration: 1.1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <RefreshCw
                              className="h-6 w-6 sm:h-8 sm:w-8"
                              strokeWidth={2.2}
                            />
                          </motion.div>
                        ) : status === "success" ? (
                          <motion.svg
                            viewBox="0 0 32 32"
                            className="h-7 w-7 sm:h-9 sm:w-9"
                            fill="none"
                            aria-hidden="true"
                          >
                            <motion.path
                              d="M7 16.5L13.1 22.2L25 10"
                              stroke="currentColor"
                              strokeWidth="3.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{
                                duration: reduceMotion ? 0 : 0.48,
                                delay: reduceMotion ? 0 : 0.12,
                                ease: easeOut,
                              }}
                            />
                          </motion.svg>
                        ) : (
                          <X
                            className="h-7 w-7 sm:h-9 sm:w-9"
                            strokeWidth={2.8}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="relative mt-6 flex flex-wrap items-center gap-2 sm:mt-8">

                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold sm:px-3.5 sm:text-xs ${
                      status === "success"
                        ? "bg-[#D9F8E9] text-[#086643]"
                        : status === "error"
                          ? "bg-[#FFE6E4] text-[#9D3038]"
                          : "bg-white/15 text-white"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : status === "error" ? (
                      <CircleHelp className="h-3.5 w-3.5" />
                    ) : (
                      <CreditCard className="h-3.5 w-3.5" />
                    )}

                    {copy.badge}
                  </span>

                  <span className="text-[10px] font-medium text-blue-100/75 sm:text-[11px]">
                    {status === "success"
                      ? "Verified by your booking system"
                      : status === "error"
                        ? "Your status needs another check"
                        : "Please keep this page open"}
                  </span>
                </div>
              </div>

              {/* Main panel body */}
              <div className="px-4 pb-5 pt-5 min-[380px]:px-5 sm:px-8 sm:pb-8 sm:pt-7 md:px-9">

                <div
                  className={`flex items-start gap-3.5 rounded-2xl border p-3.5 sm:gap-4 sm:p-4 ${
                    status === "success"
                      ? "border-[#CDEEDD] bg-[#F2FBF6]"
                      : status === "error"
                        ? "border-[#F4D8D9] bg-[#FFF7F6]"
                        : "border-[#DCE8FA] bg-[#F5F9FF]"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
                      status === "success"
                        ? "bg-[#DDF6E9] text-[#118356]"
                        : status === "error"
                          ? "bg-[#FCE3E2] text-[#C64D55]"
                          : "bg-[#E4EEFF] text-[#1762CB]"
                    }`}
                  >
                    {status === "success" ? (
                      <ShieldCheck className="h-[19px] w-[19px]" />
                    ) : status === "error" ? (
                      <CircleHelp className="h-[19px] w-[19px]" />
                    ) : (
                      <LockKeyhole className="h-[18px] w-[18px]" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-extrabold tracking-[-0.01em] text-[#263852] sm:text-sm">
                      {status === "success"
                        ? "Payment successfully verified"
                        : status === "error"
                          ? "Booking confirmation needs attention"
                          : "Securely checking your transaction"}
                    </p>

                    <p className="mt-1 text-[11px] leading-[1.65] text-[#66768D] sm:text-[13px] sm:leading-6">
                      {status === "success"
                        ? "Our server confirmed the payment status before marking your booking as confirmed."
                        : status === "error"
                          ? message
                          : "We're validating the payment session with the server. This step helps prevent an unverified redirect from being treated as a successful booking."}
                    </p>
                  </div>

                  {status === "loading" && (
                    <motion.span
                      aria-hidden="true"
                      className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2775DD]"
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: [1, 0.3, 1],
                              scale: [1, 0.8, 1],
                            }
                      }
                      transition={{
                        duration: 1.3,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-2.5 min-[440px]:flex-row sm:mt-6 sm:gap-3">

                  {status === "error" && sessionId && (
                    <button
                      type="button"
                      onClick={() =>
                        setAttempt((value) => value + 1)
                      }
                      className="group inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#D8E2F0] bg-white px-4 text-[12px] font-bold text-[#25466F] shadow-[0_3px_10px_rgba(24,55,94,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-[#AFC7E9] hover:bg-[#F8FBFF] hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C9DCFA] active:translate-y-0 sm:min-h-[52px] sm:text-[13px]"
                    >
                      <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[-35deg]" />
                      Try verification again
                    </button>
                  )}

                  {status !== "loading" && (
                    <Link
                      href="/"
                      className="group inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#0755C9] px-5 text-[12px] font-extrabold text-white shadow-[0_8px_18px_rgba(7,85,201,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0649AE] hover:shadow-[0_12px_22px_rgba(7,85,201,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#BBD2FF] active:translate-y-0 sm:min-h-[52px] sm:text-[13px]"
                    >
                      <House className="h-[17px] w-[17px]" />
                      Back to homepage
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>

                {status === "loading" && (
                  <div className="mt-5 flex items-center gap-3 sm:mt-6">
                    <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#E9EFF8]">
                      <motion.div
                        className="h-full w-[38%] rounded-full bg-[linear-gradient(90deg,#2678E8,#78B2FF)]"
                        animate={
                          reduceMotion
                            ? undefined
                            : { x: ["-110%", "280%"] }
                        }
                        transition={{
                          duration: 1.55,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>

                    <span className="shrink-0 text-[10px] font-semibold text-[#8492A6] sm:text-[11px]">
                      Please wait
                    </span>
                  </div>
                )}

                <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#EDF1F6] pt-4 text-center text-[10px] font-medium text-[#8A97A9] sm:mt-7 sm:pt-5 sm:text-[11px]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#179267]" />
                  Your payment status is checked securely on our server
                </div>
              </div>
            </motion.section>

            {/* Supporting information column */}
            <aside className="flex min-w-0 flex-col gap-4 sm:gap-5">

              <motion.section
                initial={
                  reduceMotion ? false : { opacity: 0, y: 16 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : 0.12,
                  ease: easeOut,
                }}
                className="rounded-[22px] border border-white bg-white p-4 shadow-[0_14px_45px_rgba(20,48,86,0.065)] min-[380px]:p-5 sm:rounded-[26px] sm:p-6 md:flex-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#8B99AC] sm:text-[11px]">
                      THE PROCESS
                    </p>

                    <h2 className="mt-1.5 text-[17px] font-extrabold tracking-[-0.04em] text-[#1C2D46] sm:text-[19px]">
                      Confirmation journey
                    </h2>
                  </div>

                
                </div>

                <div className="mt-5 space-y-0 sm:mt-6">
                  <JourneyStep
                    number="01"
                    title="Payment verification"
                    description="Your payment session is checked by our server."
                    state={stepOne}
                    isLast={false}
                  />

                  <JourneyStep
                    number="02"
                    title="Booking confirmation"
                    description="Your booking is confirmed after the payment is marked PAID."
                    state={stepTwo}
                    isLast={true}
                  />
                </div>

                <div className="mt-4 rounded-xl bg-[#F5F8FD] px-3.5 py-3 sm:mt-5 sm:px-4">
                  <p className="text-[10px] leading-[1.65] text-[#718198] sm:text-[11px]">
                    {status === "success"
                      ? "Both steps are complete. Your booking status has been confirmed."
                      : status === "error"
                        ? "A successful checkout redirect does not confirm a booking by itself. The server must verify the payment first."
                        : "This page will update automatically when the server finishes checking your payment."}
                  </p>
                </div>
              </motion.section>

              <motion.section
                initial={
                  reduceMotion ? false : { opacity: 0, y: 16 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : 0.2,
                  ease: easeOut,
                }}
                className="flex items-center gap-3.5 rounded-[22px] border border-[#E4EBF5] bg-white/80 p-4 shadow-[0_10px_32px_rgba(20,48,86,0.045)] min-[380px]:p-5 sm:rounded-[26px] sm:px-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#EAF6F1] text-[#14845D] sm:h-11 sm:w-11">
                  <LockKeyhole className="h-[19px] w-[19px]" />
                </span>

                <div className="min-w-0">
                  <p className="text-[12px] font-extrabold text-[#263852] sm:text-[13px]">
                    A safer checkout experience
                  </p>

                  <p className="mt-1 text-[10px] leading-[1.65] text-[#7D8BA0] sm:text-[11px]">
                    Payment confirmation is validated with your backend, not assumed from the browser redirect.
                  </p>
                </div>
              </motion.section>

              <div className="hidden items-center justify-center gap-2 px-2 text-[10px] font-medium text-[#98A4B5] md:flex">
                <CreditCard className="h-3.5 w-3.5" />
                <span>Secure payment verification</span>
              </div>
            </aside>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.3,
            }}
            className="mt-5 flex flex-col items-center justify-between gap-2 px-1 text-center text-[10px] text-[#98A4B5] sm:mt-7 sm:flex-row sm:px-2 sm:text-[11px]"
          >
            <span>
              Thank you for choosing HotelBooking.
            </span>

            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure booking experience
            </span>
          </motion.div>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-[#E6ECF4] bg-white/70 px-4 py-4 text-center text-[10px] text-[#9AA6B6] backdrop-blur sm:py-5 sm:text-[11px]">
        © {new Date().getFullYear()} HotelBooking. All rights reserved.
      </footer>
    </main>
  );
}

type JourneyStepProps = {
  number: string;
  title: string;
  description: string;
  state: "complete" | "active" | "waiting" | "attention";
  isLast: boolean;
};

function JourneyStep({
  number,
  title,
  description,
  state,
  isLast,
}: JourneyStepProps) {
  const isComplete = state === "complete";
  const isActive = state === "active";
  const isAttention = state === "attention";

  return (
    <div className="relative flex gap-3.5 sm:gap-4">
      {!isLast && (
        <div className="absolute left-[15px] top-[34px] h-[calc(100%-13px)] w-px bg-[#E5ECF5] sm:left-[17px]" />
      )}

      <div
        className={`relative z-[1] flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border text-[9px] font-extrabold sm:h-[35px] sm:w-[35px] sm:text-[10px] ${
          isComplete
            ? "border-[#BDE8D3] bg-[#E7F8EF] text-[#12845B]"
            : isAttention
              ? "border-[#F1D0D1] bg-[#FFF0EF] text-[#C54D55]"
              : isActive
                ? "border-[#C7DAFA] bg-[#EAF2FF] text-[#1762CB]"
                : "border-[#E7ECF3] bg-[#F7F9FC] text-[#9BA8B9]"
        }`}
      >
        {isComplete ? (
          <Check className="h-4 w-4" strokeWidth={2.8} />
        ) : (
          number
        )}
      </div>

      <div
        className={`min-w-0 flex-1 ${
          isLast ? "pb-0" : "pb-5 sm:pb-6"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`text-[12px] font-extrabold tracking-[-0.015em] sm:text-[13px] ${
              isComplete
                ? "text-[#1D694F]"
                : isAttention
                  ? "text-[#A13E45]"
                  : "text-[#33445D]"
            }`}
          >
            {title}
          </p>

          {isComplete && (
            <span className="rounded-full bg-[#E7F8EF] px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wide text-[#16845D]">
              Done
            </span>
          )}

          {isActive && (
            <span className="rounded-full bg-[#EAF2FF] px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wide text-[#1762CB]">
              In progress
            </span>
          )}

          {isAttention && (
            <span className="rounded-full bg-[#FFF0EF] px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wide text-[#B74850]">
              Review
            </span>
          )}
        </div>

        <p className="mt-1 max-w-[290px] text-[10px] leading-[1.65] text-[#8190A5] sm:text-[11px]">
          {description}
        </p>
      </div>
    </div>
  );
}