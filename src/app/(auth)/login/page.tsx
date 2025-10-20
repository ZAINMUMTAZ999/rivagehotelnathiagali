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
    "reservation management ArcadianResort"
    // "secure login Nathia Gali hotel"
  ]
};


export default function LoginPage(){
  return(
    <Login/>
  )
}