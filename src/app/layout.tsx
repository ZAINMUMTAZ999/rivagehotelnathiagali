import type { Metadata } from "next";
import "./globals.css";
import HomeLayout from "./Layout/HomeLayout";
import ReactQueryProvider from "./utils/page";
import { AppNotifyProvider } from "./context/AppNotify";
import { SearchContextProvider } from "./context/SearchContext";

// export const metadata: Metadata = {
// title: "SekaiSpace-Homepage",
//   description: "SekaiSpace Software Company",
// };
// Minimal improvements to your existing code:
export const metadata: Metadata = {
  title: {
    default: "SekaiSpace - Premier Software Development Company",
    template: "%s | SekaiSpace",
  
 
  },
    icons: {
    icon: "/vercel.svg", // or "/logo.png", "/logo.svg"
  },
  description: "SekaiSpace specializes in full-stack web development, mobile apps, and custom software solutions. Transform your business with cutting-edge technology.",
  // metadataBase: new URL("https://sekaispace.vercel.app"), // Add your domain
  // openGraph: {
  //   type: "website",
  //   siteName: "SekaiSpace",
  //   title: "SekaiSpace - Premier Software Development Company",
  //   description: "Transform your business with cutting-edge software solutions.",
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  // },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* React Query at the top so every component can call useQuery */}
        <ReactQueryProvider>
          <SearchContextProvider>

            <AppNotifyProvider>
          <HomeLayout>
              {children}
          </HomeLayout>
              </AppNotifyProvider>
          </SearchContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
