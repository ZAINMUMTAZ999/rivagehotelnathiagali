import type { Metadata } from "next";
import "./globals.css";
import HomeLayout from "./Layout/HomeLayout";
import { AppNotifyProvider } from "./context/AppNotify";
import { SearchContextProvider } from "./context/SearchContext";
import Providers from "./utils/page";
// import PwaInstallPrompt from "./components/PwaInstallPrompt";
// import PwaInstallPrompt from "./components/PwaInstallPrompt";


export const metadata: Metadata = {
  title: "HotelWebApp - in Islamabad",
  description: "Luxury Hotel in Islamabad to stay and enjoy the nature scenery.",
  icons: { icon: "/logo.svg" },
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ touchAction: "pan-x pan-y" }}> 
        <Providers>
          <SearchContextProvider>
            <AppNotifyProvider>
              <HomeLayout>{children}</HomeLayout>
            </AppNotifyProvider>
          </SearchContextProvider>
        </Providers>
        {/* <PwaInstallPrompt /> */}
      </body>
    </html>
  );
}
