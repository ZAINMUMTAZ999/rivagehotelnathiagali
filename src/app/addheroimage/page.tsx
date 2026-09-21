import Link from "next/link";
import UserProfile from "../components/AddheroImage";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold underline text-slate-800">
              Add Homepage Image
            </h1>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-700 to-rose-600 px-4 sm:px-5 py-2.5 text-sm sm:text-base text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all"
            >
              Go to Dashboard
            </Link>

          </div>
        </div>
      </header>

      {/* Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
        <UserProfile />
      </main>

    </div>
  );
}