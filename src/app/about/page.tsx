import { Metadata } from "next";
// import About from "../components/about";
import AboutUs from "../components/about";
// import Link from "next/link";
// import WhatsAppLinkButton from "../components/WA";

export const metadata: Metadata = {
  title: "About SekaiSpace – Custom Software & Web Development Company",
  description:
    "SekaiSpace is a Pakistan-based software company founded in 2025. We build scalable, custom web and mobile applications for startups, small businesses, and enterprises worldwide.",
  keywords: [
    "SekaiSpace",
    "custom software development Pakistan",
    "web development company Pakistan",
    "MERN stack development",
    "Next.js developers",
    "mobile app development",
    "startup software solutions",
    "full-stack web development",
    "enterprise software services"
  ],
  openGraph: {
    title: "About SekaiSpace – Custom Software & Web Development Company",
    description:
      "Learn about SekaiSpace, a modern software company crafting custom web and mobile applications for global clients.",
    url: "https://sekaispace.vercel.app/about",
    type: "website",
    images: [
      {
        url: "/about-og-image.jpg", // add this image in /public
        width: 1200,
        height: 630,
        alt: "SekaiSpace team working on custom web development projects"
      }
    ]
},
  twitter: {
    card: "summary_large_image",
    title: "About SekaiSpace – Custom Software & Web Development Company",
    description:
      "Discover SekaiSpace, a Pakistan-based software company delivering scalable, custom solutions for startups and enterprises.",
    images: ["/about-twitter-image.jpg"]
  },
  alternates: {
    canonical: "https://sekaispace.vercel.app/about"
  }
};

export default function AboutPage(){
  return(
    
    <AboutUs/>
   
    
  )
}