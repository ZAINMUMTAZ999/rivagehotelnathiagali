import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <section className="max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-red-600 mb-6">
          Application Under Development
        </h1>
        <p className="text-gray-700 mb-8 text-base sm:text-lg">
          The “All Contacts” section is currently in progress. Please check back
          soon for updates.
        </p>
        <Link
          href="/dashboard"
          className="inline-block rounded-2xl bg-red-600 px-6 py-3 text-white font-semibold shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-200"
        >
          Go Back to Dashboard
        </Link>
      </section>
    </main>
  );
}
