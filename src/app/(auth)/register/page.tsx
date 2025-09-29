import Register from "@/app/components/register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - Rivage cottage NathiaGali | Resort ",
  description:
    "Vists Rivage cottage NathiaGali today. Create your free account to access affordable rooms, ultra luxury",

  keywords: [
    "Rivage cottage NathiaGali register",
    "create account Rivage cottage NathiaGali",
    "sign up Rivage cottage NathiaGali",
    "resort in nathia gali Rivage cottage ",
    "rooms",
    "join Rivage cottage NathiaGali",
    "nathia gali"
  ],

  // openGraph: {
  //   title: "Register - SekaiSpace | Create Your Account",
  //   description:
  //     "Sign up for SekaiSpace and start your journey with professional web development, mobile apps, and cloud solutions. Affordable plans starting at 25,000 PKR.",
  //   url: "https://sekaispace.vercel.app/register",
  //   type: "website",
  //   images: [
  //     {
  //       url: "/register-og-image.jpg", // design a professional signup image
  //       width: 1200,
  //       height: 630,
  //       alt: "SekaiSpace Register Page"
  //     }
  //   ]
  // },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "Register - SekaiSpace",
  //   description:
  //     "Create your SekaiSpace account to access professional web, mobile, and cloud solutions. Start building today.",
  //   images: ["/register-twitter-image.jpg"]
  // },

  // alternates: {
  //   canonical: "https://sekaispace.vercel.app/register"
  // }
};

export default function RegisterPage(){
  return(
    <Register/>
  )
}