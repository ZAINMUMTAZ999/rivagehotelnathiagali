import Login from "@/app/components/login";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login - Rivage cottage NathiaGali",
  description:
    "Secure login to your Rivage cottage NathiaGali account.",
  
  keywords: [
    "Rivage cottage NathiaGali login",
    "client login Rivage cottage NathiaGali",
    "Resorts Rivage cottage NathiaGali",
    "Rooms Rivage cottage NathiaGali account login",
    "Clean Environment",
    "Luxury - offordable rooms"
  ],


};


export default function LoginPage(){
  return(
    <Login/>
  )
}