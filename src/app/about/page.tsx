import { Metadata } from "next";
import AboutUs from "../components/about";

export const metadata: Metadata = {
  title: {
    default: "About ArcadianResort – Luxury Hotel in Nathia Gali",
    template: "%s | ArcadianResort"
  },
  description: 
    "ArcadianResort is a luxury hotel in Nathia Gali offering comfortable stays, breathtaking mountain views, and exceptional hospitality. Perfect for families, couples, and nature lovers.",
  keywords: [
    "ArcadianResort",
    "hotel in Nathia Gali",
    "luxury hotel Pakistan",
    "mountain resort Nathia Gali",
    "nature stay Pakistan",
    "family hotel Nathia Gali",
    "couple getaway Pakistan",
    "resort with scenic views",
    "best hotels in Nathia Gali"
  ],
  icons: {
    icon: "/logo.svg"
  },
  openGraph: {
    title: "About ArcadianResort – Luxury Hotel in Nathia Gali",
    description: 
      "Learn about ArcadianResort, a luxury hotel in Nathia Gali offering unforgettable stays, stunning natural scenery, and top-class hospitality.",
    url: "https://arcadianresort.com/about",
    type: "website",
    siteName: "ArcadianResort",
    images: [
      {
        url: "/about-og-image.jpg", // add an image in /public
        width: 1200,
        height: 630,
        alt: "ArcadianResort hotel with mountain view in Nathia Gali"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About ArcadianResort – Luxury Hotel in Nathia Gali",
    description: 
      "Discover ArcadianResort, a premium hotel in Nathia Gali offering luxury stays, stunning views, and exceptional services for all guests.",
    images: ["/about-twitter-image.jpg"]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://arcadianresort.com/about"
  }
};


export default function AboutPage(){
  return(
    
    <AboutUs/>
   
    
  )
}