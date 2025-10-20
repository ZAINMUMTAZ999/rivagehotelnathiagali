import type { Metadata } from "next";
import "./globals.css";
import HomeLayout from "./Layout/HomeLayout";
import { AppNotifyProvider } from "./context/AppNotify";
import { SearchContextProvider } from "./context/SearchContext";
import Providers from "./utils/page";

export const metadata: Metadata = {
  title: {
    default: "HotelWebApp -  in Islamabad",
    template: "%s | SekaiSpace",
  
 
  },

    icons: {
    icon: "/logo.svg", 
  },
  description: "Hotel Luxury Hotel in Islamabd to stay and enjoy the nature scenory."
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
