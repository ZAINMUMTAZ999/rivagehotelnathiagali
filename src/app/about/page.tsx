import { Metadata } from "next";
import AboutUs from "../components/about";

export const metadata: Metadata = {
  title: {
    default: "About HotelWebApp – Luxury Hotel in Nathia Gali",
    template: "%s | SekaiSPace",
  },
  description:
    "Hotel is a luxury hotel in Nathia Gali offering comfortable stays, breathtaking mountain views, and exceptional hospitality. Perfect for families, couples, and nature lovers."
};

export default function AboutPage() {
  return <AboutUs />;
}
