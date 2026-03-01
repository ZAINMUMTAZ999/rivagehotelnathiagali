// import AddHeroImageCom from "../components/AddheroImage";

import Link from "next/link";
import UserProfile from "../components/AddheroImage";

export  default function dashboard (){
    return(
        <div>
          <div className="sticky  top-0 z-20 bg-white/70 backdrop-blur-md border-b border-slate-200/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-lg underline sm:text-xl font-bold text-slate-800">
            Add Homepage Image
          </h1>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-700 to-rose-600 px-4 py-2 text-white font-semibold shadow hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all text-sm" 
          >
            Go to Dashboard 
          </Link>
        </div>
      </div>
        <UserProfile/>
        </div>
        
    )
};