
"use client";

import { useEffect, useState } from "react";
import { verifyPayment } from "../../Api";
import Link from "next/link";

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
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">

        {loading ? (
          <div className="text-5xl mb-4">⏳</div>
        ) : success ? (
          <div className="text-5xl mb-4">✅</div>
        ) : (
          <div className="text-5xl mb-4">❌</div>
        )}

        <h1 className="text-3xl font-bold mb-4">
          {loading
            ? "Verifying Payment"
            : success
            ? "Payment Successful"
            : "Verification Failed"}
        </h1>

        <p className="text-gray-600">{message}</p>

        {!loading && (
          <Link
            href="/"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Home
          </Link>
        )}

      </div>
    </main>
  );
}
