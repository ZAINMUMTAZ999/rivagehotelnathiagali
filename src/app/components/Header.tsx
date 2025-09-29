"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { AppContext } from "../context/AppNotify";
import Logout from "../(auth)/logout/page";
import Image from "next/image";

const navLinks = [
  { name: "Rooms", href: "/allrooms" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const pathname = usePathname();
  const { isLogged, isAdmin } = AppContext();

  const closeMobileNav = () => setMobileNav(false);

  return (
    <header className="sticky top-0 z-50 bg-blue-900 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
        
             <Image
            src="/logo.svg"
            alt="Site Logo"
            width={60}
            height={60}
            className="rounded-full"
            priority
          />
          <span className="text-lg sm:text-xl font-bold text-white">
            <b>ArcadianResort</b>
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-white">
          {navLinks.map((nav) => {
            const isActive = pathname === nav.href;
            
            return (
              <Link
                key={nav.name}
                href={nav.href}
                className={`font-medium transition-all duration-200 px-3 py-2 rounded-xl
                  ${
                    isActive
                      ? "text-black bg-[#B6E6FF] shadow-sm"
                      : "text-white font-extrabold tracking-wide hover:bg-[#B8E6FF] hover:text-black"
                  }
                `}
              >
                {nav.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Admin Buttons - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-2">
          {isAdmin && (
            <div className="flex items-center gap-2 mr-4 ">
              <Link href="/dashboard ">
                <Button size="sm" variant="outline" className="bg-white hover:cursor-pointer text-blue-900 hover:bg-gray-300">
                  Dashboard⚙️
                </Button>
              </Link>
              
            </div>
          )}
          
          {/* Desktop Login Button */}
          <Button
            asChild
            className="bg-blue-400 hover:bg-blue-600 text-white px-4 sm:px-6"
          >
            {isLogged ? <Logout /> : <Link href="/login">Login</Link>}
          </Button>
        </div>

        {/* Mobile menu toggle - Hidden on desktop */}
        <button
          className="lg:hidden text-white p-2 hover:bg-blue-800 rounded-md transition-colors"
          onClick={() => setMobileNav(true)}
          aria-label="Open mobile menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileNav 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeMobileNav}
        />
        
        {/* Sidebar */}
        <aside 
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-blue-900 shadow-xl transform transition-transform duration-300 ${
            mobileNav ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-800">
            <div className="flex items-center gap-2">
              {/* <Image
                src={logo}
                alt="RivageCottage"
                className="h-8 w-8 object-contain"
              /> */}
               <Link href="/" className="flex items-center gap-2 flex-shrink-0">
        
             <Image
            src="/logo.svg"
            alt="Site Logo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="text-sm sm:text-sm font-bold text-white">
            <b>ArcadianResort</b>
          </span>
        </Link>
            </div>
            <button
              className="text-white p-2 hover:bg-blue-800 rounded-md transition-colors"
              onClick={closeMobileNav}
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col p-4">
            {navLinks.map((nav) => {
              const isActive = pathname === nav.href;
              
              return (
                <Link
                  key={nav.name}
                  href={nav.href}
                  onClick={closeMobileNav}
                  className={`px-4 py-3 font-medium rounded-lg mb-2 transition-all duration-200 ${
                    isActive
                      ? "text-black bg-[#B6E6FF] shadow-sm"
                      : "text-white hover:bg-blue-800"
                  }`}
                >
                  {nav.name}
                </Link>
              );
            })}

            {/* Mobile Admin Buttons */}
            {isAdmin && (
              // <div className="border-t border-blue-800 bg-blue-950 pt-4 mt-4">
              //   {/* <p className="text-white text-sm font-medium mb-3 px-4">Admin Actions</p> */}
               
              // </div>
               <Link href="/dashboard" onClick={closeMobileNav}>
                  <Button 
                    className="w-full mb-2 bg-white text-blue-900 hover:bg-gray-100" 
                    onClick={closeMobileNav}
                  >
                     Dashboard⚙️
                    
                  </Button>
                </Link>
               
            )}

            {/* Mobile Login Button */}
            <div className="border-t border-blue-800 pt-4 mt-4">
              <Button
                asChild
                className="w-full bg-blue-400 hover:bg-blue-600 text-white"
                onClick={closeMobileNav}
              >
                {isLogged ? <Logout /> : <Link href="/login">Login</Link>}
              </Button>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default Header;