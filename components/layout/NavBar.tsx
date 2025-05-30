"use client";
import React, { useState, useEffect } from "react";
import NavMenu from "./NavMenu";
import Image from "next/image";
import ShopCart from "../utils/ShopCart";
import Link from "next/link";
import { MapPin, Menu } from "lucide-react";
import TopBar from "./TopBar";

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar with smooth transition */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isSticky ? "h-0 opacity-0" : "h-auto opacity-100"
        }`}
      >
        <TopBar />
      </div>

      <header
        className={` top-0 bg-white z-50 border-b border-gray-200 shadow-lg transition-all duration-300 ${
          isSticky ? "py-2" : "py-4"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="container mx-auto hidden lg:block">
          <div className="flex items-center justify-between">
            {/* Left Section - Boutiques */}
            {/* Center Section - Logo */}
            <Link href="/" className="flex justify-center">
              <Image src={"/logo.png"} alt="T" width={100} height={30} />
            </Link>
            <div
              className={`transition-all duration-300 flex justify-center ${
                isSticky ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
              }`}
            >
              <NavMenu />
            </div>
            {/* Right Section - Search & Cart */}
            <div className="flex items-center justify-end gap-4">
              <ShopCart />
            </div>
          </div>

          {/* Navigation Menu with smooth transition */}
        </div>

        {/* Mobile Navigation */}
        <div className="container mx-auto lg:hidden">
          <div className="flex items-center justify-between px-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 transition-all duration-300 hover:bg-gray-100 rounded"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={30}
                className="transition-all duration-300"
              />
            </Link>

            <ShopCart />
          </div>

          {/* Mobile Menu Dropdown with smooth transition */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pb-4">
              <NavMenu />
              <div className="mt-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">Boutiques</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
