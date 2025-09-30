import type { Metadata } from "next";
import "./globals.css";
import HomeLayout from "./Layout/HomeLayout";
import { AppNotifyProvider } from "./context/AppNotify";
import { SearchContextProvider } from "./context/SearchContext";
import Providers from "./utils/page";

export const metadata: Metadata = {
  title: {
    default: "ArcadianResort - Hotel in Nathia Gali",
    template: "%s | ArcadianResort",
  
 
  },

    icons: {
    icon: "/logo.svg", 
  },
  description: "ArcadianResort Luxury Hotel in Nathia Gali to stay and enjoy the nature scenory.",
  metadataBase: new URL("https://arcadianresort.com"), 
  openGraph: {
    type: "website",
    siteName: "ArcadianResort",
    title: "ArcadianResort - Hotel in Nathia Gali",
    description: "Hotel in Nathia Gali ArcadianResort.Northern Areas Hotel",
  },
  robots: {
    index: true,
    follow: true,
  },
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
