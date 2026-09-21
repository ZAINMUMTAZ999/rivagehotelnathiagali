import Link from "next/link";
import UserProfile from "../components/AddheroImage";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-lg underline sm:text-xl font-bold text-slate-800">
            Add Hero Image
          </h1>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-xl bg-blue-600  px-4 py-2 text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all text-sm" 
          >
            Go to Dashboard 
          </Link>
        </div>

      {/* Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
        <UserProfile />
      </main>

    </div>
  );
}