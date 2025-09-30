import AllRoomPage from "./allroomspage";


export const metadata = {
  title: "All Rooms – ArcadianResort Nathia Gali",
  description:
    "Browse all rooms at ArcadianResort in Nathia Gali. Luxury stays, comfortable accommodations, and breathtaking mountain views for families, couples, and travelers.",
  keywords: [
    "ArcadianResort rooms Nathia Gali",
    "hotel rooms Nathia Gali",
    "luxury hotel stay Pakistan",
    "family rooms Nathia Gali",
    "mountain view hotel"
  ],
  openGraph: {
    title: "All Rooms – ArcadianResort Nathia Gali",
    description: "View all available rooms at ArcadianResort Nathia Gali. Book your stay in luxury rooms with mountain views and premium facilities.",
    url: "https://arcadianresort.com/allrooms",
    type: "website",
    siteName: "ArcadianResort",
    images: [
      {
        url: "/allrooms-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ArcadianResort rooms in Nathia Gali"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "All Rooms – ArcadianResort Nathia Gali",
    description: "Explore all rooms at ArcadianResort Nathia Gali. Comfortable stays, luxury amenities, and breathtaking views await you.",
    images: ["/allrooms-twitter-image.jpg"]
  },
  alternates: {
    canonical: "https://arcadianresort.com/allrooms"
  }
};

export default async function Page() {
  return <AllRoomPage />; // your client component
}
