
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppNotifyProvider } from "../context/AppNotify";


type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return (
  
    <div className="min-h-screen flex flex-col   bg-white">

      <Header />
      
 <AppNotifyProvider
 >

          {children}
 </AppNotifyProvider>
       
 
     
      <Footer />
    </div>
   
  );
};

export default HomeLayout;