import type { Metadata } from "next";
import "./globals.css";
import HomeLayout from "./Layout/HomeLayout";
import { AppNotifyProvider } from "./context/AppNotify";
import { SearchContextProvider } from "./context/SearchContext";
import Providers from "./utils/page";

export const metadata: Metadata = {
  title: {
    default: "HotelWebApp - in Islamabad",
    template: "%s | SekaiSpace",
  },
  description: "Luxury Hotel in Islamabad to stay and enjoy the nature scenery.",
  
  // Existing icons
  icons: {
    icon: "/logo.svg",
  },

  // Add these two lines for PWA
  manifest: "/manifest.json",      // link to your manifest
  themeColor: "#000000",           // matches your manifest.json
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

       <Providers>
          <SearchContextProvider>

            <AppNotifyProvider>
          <HomeLayout> 
            {
              children
            }
      
         </HomeLayout>
              </AppNotifyProvider>
          </SearchContextProvider>
        </Providers>
      </body>
    </html>
  );
}
