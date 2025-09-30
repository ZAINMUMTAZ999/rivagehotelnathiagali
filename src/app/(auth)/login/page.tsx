import Login from "@/app/components/login";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default: "Login – ArcadianResort Nathia Gali",
    template: "%s | ArcadianResort"
  },
  description: 
    "Secure login to your ArcadianResort Nathia Gali account. Access your bookings, manage reservations, and enjoy a personalized hotel experience.",
  keywords: [
    "ArcadianResort login",
    "hotel account login Nathia Gali",
    "client login ArcadianResort",
    "manage bookings Nathia Gali",
    "luxury hotel account access",
    "reservation management ArcadianResort",
    "secure login Nathia Gali hotel"
  ],
  icons: {
    icon: "/logo.svg"
  },
  openGraph: {
    title: "Login – ArcadianResort Nathia Gali",
    description: 
      "Access your ArcadianResort account to manage bookings, view reservations, and enjoy a seamless hotel experience in Nathia Gali.",
    url: "https://arcadianresort.com/login",
    type: "website",
    siteName: "ArcadianResort",
    images: [
      {
        url: "/login-og-image.jpg", // optional image in /public
        width: 1200,
        height: 630,
        alt: "ArcadianResort login page"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Login – ArcadianResort Nathia Gali",
    description: 
      "Securely log in to your ArcadianResort account to manage your bookings and reservations at our luxury hotel in Nathia Gali.",
    images: ["/login-twitter-image.jpg"]
  },
  robots: {
    index: false, // usually login pages are not indexed
    follow: true
  },
  alternates: {
    canonical: "https://arcadianresort.com/login"
  }
};


export default function LoginPage(){
  return(
    <Login/>
  )
}